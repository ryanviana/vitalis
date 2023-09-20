import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../input";
import Card from "../card";
import { LoadingState } from "@taikai/rocket-kit";
import { toast } from "react-toastify";
import { ethers } from 'ethers';
import { EthersjsNomoSigner } from "ethersjs-nomo-plugins/dist/ethersjs_nomo_signer";
import { zscProvider } from "ethersjs-nomo-plugins/dist/ethersjs_provider";
import { AutoComplete, Button, ConfigProvider } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';


declare let window: any;

const FinishConsultation = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        getValues
    } = useForm({});
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState([]);
    const [diagOptions, diagSetOptions] = React.useState([]);
    const [diagSelectedConditions, diagSetSelectedConditions] = useState<string[]>([]);
    const [diagInputValue, diagSetInputValue] = useState<string>('');
    const [diagCurrentInputValue, diagSetCurrentInputValue] = useState<string>('');
    const [drugOptions, drugSetOptions] = React.useState([]);
    const [drugSelectedConditions, drugSetSelectedConditions] = useState<string[]>([]);
    const [drugInputValue, drugSetInputValue] = useState<string>('');
    const [drugCurrentInputValue, drugSetCurrentInputValue] = useState<string>('');
    const CONTRACT_ADDRESS = "0x0308a840397048A39B910093eD15E5FFc9bb790F";
    const contractJSON = require('../../utils/NewHealthDashboard.json');


    interface Disease {
        disease: string;
        chance: number;
    }

    interface DiseaseBadgeProps {
        disease: string;
        chance: number;
    }



    async function getProvider(): Promise<ethers.providers.Web3Provider | null> {
        if (!window.ethereum) {
            toast.error("Carteira não encontrada!");
            return null;
        }

        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            return provider;
        } catch (error) {
            console.error("Erro ao conectar na Metamask:", error);
            toast.error("Erro ao conectar na Metamask.");
            return null;
        }
    }
    async function searchIcdByPartialSymptom(symptom: string) {
        try {
            const endpoint = 'http://localhost:3001/icd';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ symptoms: symptom })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // diagSetOptions(data.map((item) => ({ value: item.name })));
            diagSetOptions(data.map((item) => ({ value: { name: item.name, id: item.id } })));


        } catch (error) {
            console.error("Error fetching symptoms:", error);
        }
    }

    async function searchOpenFdaForMedicine(drug: string) {
        try {
            const endpoint = 'http://localhost:3001/openfda/search?name=' + drug + '&limit=10';
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {

                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            // drugSetOptions(data.map((item) => ({ value: item.brand_name[0].concat(" - ", item.generic_name[0]) })));
            drugSetOptions(data.map((item) => ({ value: { brand: item.brand_name[0], generic_name: item.generic_name[0], id: item.application_number[0] } })));

        } catch (error) {
            console.log(error)
            console.error("Error fetching symptoms:", error);
        }
    }

    async function getAiDiagnosis(symptom: string) {
        const endpoint = 'http://localhost:3001/gpt';
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ symptoms: symptom })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    }

    const onSecondButtonClick = async (condition: string) => {
        setLoading(true);

        try {
            const AI_RESPONSE = await getAiDiagnosis(condition);
            const AI_DIAGNOSIS = AI_RESPONSE.map((item: { disease: string; chance: string; }) => ({ disease: item.disease, chance: (Number.parseFloat(item.chance) * 100) }));
            setMessage(AI_DIAGNOSIS);
            toast.success("AI successfully consulted!");
        } catch (error) {
            console.log(error);
            console.error("Erro durante a consulta a IA:", error);
            toast.error("Ocorreu um erro durante a execução da segunda função.");
        }
        setLoading(false);
    };

    const onSubmit = async (data) => {
        setLoading(true);

        const { patientAddress, condition, diagnosis, medication, observation } = data;

        try {
            const abi = contractJSON.abi;
            const signer = new EthersjsNomoSigner(zscProvider);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
            const tx = await contract.finishConsultation(
                patientAddress,
                condition,
                drugSelectedConditions[0].brand,
                observation,
                diagSelectedConditions[0].name,
                diagSelectedConditions[0].id,
                { gasLimit: 1000000 }
            );
            await tx.wait();


        } catch (error) {
            console.error("Erro durante a finalização da consulta:", error);
            // toast.error("Ocorreu um erro durante a finalização da consulta.");
        } finally {
            toast.success('Consultation successfully finished!');
            setLoading(false);
        }
    };

    return (
        <Card title="Conclude Consultation" classes="grow">
            <p>
                The information will be securely stored and can be accessed by the patient at any time. Please exercise caution, as once entered, this data cannot be changed.
            </p>
            {!loading ? (
                <form className="flex flex-col gap-4 m-8" onSubmit={handleSubmit(onSubmit)}>

                    <Input control={control} name="patientAddress" errors={errors} placeholder="Patient's Address" />

                    <Input control={control} name="condition" errors={errors} placeholder="Symptoms" />

                    <ConfigProvider
                        theme={{
                            token: {
                                fontSize: 16,
                                colorBorder: '#d9d4ed',
                                colorTextPlaceholder: '#9ca2ae',
                                controlHeight: 50,
                                fontFamily: 'Roboto',
                                colorPrimaryHover: '#4228a6',

                            },
                        }}
                    >
                        <AutoComplete
                            allowClear={{ clearIcon: <CloseSquareFilled /> }}
                            onClear={() => {
                                diagSetSelectedConditions([]);
                                diagSetInputValue('');
                                diagSetCurrentInputValue('');
                            }}
                            value={diagCurrentInputValue === '' ? diagInputValue : diagCurrentInputValue}
                            options={diagOptions.map(option => ({
                                value: option.value.id,
                                label: option.value.name
                            }))}
                            onSearch={value => {
                                searchIcdByPartialSymptom(value);
                                diagSetCurrentInputValue(value);
                            }}
                            onSelect={(selectedId) => {
                                const selectedOption = diagOptions.find(option => option.value.id === selectedId);
                                if (!selectedOption) return; // or handle this case in some other way

                                const selectedName = selectedOption.value.name;

                                diagSetSelectedConditions(prevConditions => {
                                    if (prevConditions.includes(selectedId)) {
                                        return prevConditions;
                                    }
                                    return [...prevConditions, selectedOption.value];
                                });

                                diagSetCurrentInputValue('');
                                diagSetInputValue(prevNames => `${prevNames}${prevNames.length > 0 ? ', ' : ''}${selectedName}`);
                            }}



                            placeholder="Diagnosis"
                        />

                        <AutoComplete
                            allowClear={{ clearIcon: <CloseSquareFilled /> }}
                            onClear={() => {
                                drugSetSelectedConditions([]);
                                drugSetInputValue('');
                                drugSetCurrentInputValue('');
                            }}
                            value={drugCurrentInputValue === '' ? drugInputValue : drugCurrentInputValue}
                            options={drugOptions.map(option => ({
                                value: option.value.id,
                                label: option.value.brand
                            }))}
                            onSearch={value => {
                                searchOpenFdaForMedicine(value);
                                drugSetCurrentInputValue(value);
                            }}
                            onSelect={(selectedId) => {
                                const selectedOption = drugOptions.find(option => option.value.id === selectedId);
                                if (!selectedOption) return; // or handle this case in some other way

                                const selectedName = selectedOption.value.brand;

                                drugSetSelectedConditions(prevConditions => {
                                    if (prevConditions.includes(selectedId)) {
                                        return prevConditions;
                                    }
                                    return [...prevConditions, selectedOption.value];
                                });

                                drugSetCurrentInputValue('');
                                drugSetInputValue(prevNames => `${prevNames}${prevNames.length > 0 ? ', ' : ''}${selectedName}`);
                            }}



                            placeholder="Medication"
                        />

                    </ConfigProvider>

                    <Input control={control} name="observation" errors={errors} placeholder="Observations" />

                    <div className="flex justify-center mt-4">
                        <Button
                            className="hover:scale-105 transition mx-auto"
                            style={{ backgroundColor: '#007BFF', borderColor: '#006FDB' }}
                            type="primary"
                            htmlType="submit"
                        >
                            Conclude
                        </Button>
                    </div>

                    <div className="flex justify-center mt-4">
                        <Button
                            className="hover:scale-105 transition mx-auto"
                            style={{ borderColor: '#007BFF', color: '#007BFF' }}
                            type="default"
                            onClick={() => onSecondButtonClick(getValues('condition'))}
                        >
                            Consult Our AI
                        </Button>
                    </div>

                </form>

            ) : (
                <LoadingState cardsNumber={8} center lines={14} type="text" />
            )}

            {message.length > 0 && (
                <>
                    <h3 className="text-lg font-bold mt-4 mb-2">Possible Diagnoses</h3>
                    <ul>
                        {message.map((item, index) => (
                            <li key={index} className="border-b border-gray-300 py-2">
                                <strong>{item.disease}:</strong> {item.chance}%
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </Card>
    );


};

export default FinishConsultation;
