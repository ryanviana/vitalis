import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../input";
import Card from "../card";
import { LoadingState } from "@taikai/rocket-kit";
import { axios } from "@/config/axios";
import { ethers } from 'ethers'; // Importe a biblioteca ethers
import { toast } from "react-toastify";
import { Button } from 'antd';
import { data } from "autoprefixer";
import { EthersjsNomoSigner } from "ethersjs-nomo-plugins/dist/ethersjs_nomo_signer";
import { zscProvider } from "ethersjs-nomo-plugins/dist/ethersjs_provider";

declare let window: any;


const CreateInstitution = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        getValues
    } = useForm({});
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState<string[]>([]);

    async function getProvider(): Promise<ethers.providers.Web3Provider | null> {
        // Verifica se o MetaMask está disponível no navegador
        if (!window.ethereum) {
            toast.error("Carteira não encontrada!");
            return null;
        }

        try {
            // Solicita permissão para acessar a carteira Ethereum (MetaMask)
            await window.ethereum.request({ method: "eth_requestAccounts" });

            // Cria um provedor Ethereum usando ethers.js
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            return provider;
        } catch (error) {
            console.error("Erro ao conectar na Metamask:", error);
            toast.error("Erro ao conectar na Metamask.");
            return null;
        }
    }

    const onSubmit = async (data: any) => {
        setLoading(true);

        const CONTRACT_ADDRESS = "0x0308a840397048A39B910093eD15E5FFc9bb790F"; //Endereço do HealthDashboard
        const contractJSON = require('../../utils/NewHealthDashboard.json'); // Importe o JSON do contrato
        const { patientAddress, familyHistory, immunizationHistory, surgicalHistory, allergiesAndReactions } = data;


        try {
            // const provider = await getProvider();

            const abi = contractJSON.abi;

            const signer = new EthersjsNomoSigner(zscProvider);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

            // const tx = await contract.setAnamnesis(patientAddress, familyHistory, immunizationHistory, surgicalHistory, allergiesAndReactions);

            const tx = await contract.setAnamnesis(patientAddress, familyHistory, immunizationHistory, surgicalHistory, allergiesAndReactions, { gasLimit: 1000000 });
            await tx.wait(); // Espere a transação ser confirmada
            toast.success('Anamnese atualizada');
            reset();
        } catch (error: any) {
            console.log(error);
            // toast.error("error");
        }
        finally {
            toast.success('Medical history successfully updated!');
            setLoading(false);
        }
    };

    const onSecondButtonClick = async (patientAddress: string) => {

        const CONTRACT_ADDRESS = "0xaAc57cDf4e2eB24F2d1Dd6522d856678ec7331f5"; //Endereço do contrato de anamnese
        const contractJSON = require('../../utils/AnamnesisContract.json'); // JSON do contrato de anamnese

        try {

            const abi = contractJSON.abi;
            const signer = new EthersjsNomoSigner(zscProvider);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

            const tx: string[] = await contract._getAnamnesis(patientAddress);

            setMessage(tx);


            // const diseasesSample = [ //Exemplo
            //     { disease: "Dengue", probability: 70 },
            //     { disease: "Febre amarela", probability: 40 },
            //     { disease: "Malária", probability: 10 }
            // ];
            // setMessage(diseasesSample); 

            toast.success("Success");
        } catch (error) {
            console.error("Error", error);
            toast.error("Error");
        }
    };

    return (
        <Card title="Patient Medical History" classes="grow">
            <p >
                Access previously recorded medical details from past consultations to streamline your process. To update the patient's data, please complete the fields below.
            </p>
            {!loading ? (
                <form className="flex flex-col gap-4 m-8" onSubmit={handleSubmit(onSubmit)}>
                    <Input control={control} name="patientAddress" errors={errors} placeholder="Patient's Address" />
                    <Input control={control} name="familyHistory" errors={errors} placeholder="Family History" />
                    <Input control={control} name="immunizationHistory" errors={errors} placeholder="Immunization History" />
                    <Input control={control} name="surgicalHistory" errors={errors} placeholder="Surgical History" />
                    <Input control={control} name="allergiesAndReactions" errors={errors} placeholder="Allergies and Reactions" />
                    <div className="flex justify-center mt-4">
                        <Button
                            className="hover:scale-105 transition mx-auto"
                            style={{ backgroundColor: '#007BFF', borderColor: '#006FDB' }}
                            type="primary"
                            htmlType="submit"
                        >
                            Update
                        </Button>
                    </div>

                    <div className="flex justify-center mt-4">
                        <Button
                            className="hover:scale-105 transition mx-auto"
                            style={{ borderColor: '#007BFF', color: '#007BFF' }}
                            type="default"
                            onClick={() => onSecondButtonClick(getValues('patientAddress'))}


                        >
                            Verify Patient's History
                        </Button>
                    </div>
                </form>
            ) : (
                <LoadingState cardsNumber={8} center lines={14} type="text" />
            )}

            {message.length > 0 && (
                <>
                    <h3 className="text-lg font-bold mt-4 mb-2"></h3>
                    <ul>
                        <li className="border-b border-gray-300 py-2">
                            <strong>Family History:</strong> {message[0]}
                        </li>
                        <li className="border-b border-gray-300 py-2">
                            <strong>Immunizations:</strong> {message[1]}
                        </li>
                        <li className="border-b border-gray-300 py-2">
                            <strong>Surgical History:</strong> {message[2]}
                        </li>
                        <li className="border-b border-gray-300 py-2">
                            <strong>Allergies and Reactions:</strong> {message[3]}
                        </li>
                    </ul>

                </>
            )}

        </Card>
    );
};

export default CreateInstitution;