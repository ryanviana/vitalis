// components/SignUpSection.tsx
"use client"
import React, { useState, useRef } from 'react';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ethers } from 'ethers'; // Importe a biblioteca ethers
import { EthersjsNomoSigner } from "ethersjs-nomo-plugins/dist/ethersjs_nomo_signer";
import { zscProvider } from "ethersjs-nomo-plugins/dist/ethersjs_provider";
import { set } from 'react-hook-form';

const SignUpSection: React.FC = () => {
    const [activeButton, setActiveButton] = useState('doctor');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const formRef = useRef<HTMLFormElement>(null);

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const onRegisterDoctor = async (data: any) => {

        const CONTRACT_ADDRESS = "0x0308a840397048A39B910093eD15E5FFc9bb790F"; //Endereço do HealthDashboard
        const contractJSON = require('../../utils/NewHealthDashboard.json'); // Importe o JSON do contrato
        const { doctorName, doctorCRM } = data;


        try {
            // const provider = await getProvider();

            const abi = contractJSON.abi;

            const signer = new EthersjsNomoSigner(zscProvider);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

            // const tx = await contract.setAnamnesis(pacientAddress, familyHistory, immunizationHistory, surgicalHistory, allergiesAndReactions);

            const tx = await contract.registerDoctor(doctorName, doctorCRM);

            await tx.wait(); // Espere a transação ser confirmada
            toast.success('Doctor successfully registered!');

        } catch (error: any) {
            console.log(error);
            // toast.error("error");
        }
    };

    const onRegisterPatient = async () => {

        const CONTRACT_ADDRESS = "0x0308a840397048A39B910093eD15E5FFc9bb790F"; //Endereço do HealthDashboard
        const contractJSON = require('../../utils/NewHealthDashboard.json'); // Importe o JSON do contrato

        try {
            // const provider = await getProvider();

            const abi = contractJSON.abi;

            const signer = new EthersjsNomoSigner(zscProvider);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

            // const tx = await contract.setAnamnesis(pacientAddress, familyHistory, immunizationHistory, surgicalHistory, allergiesAndReactions);

            const tx = await contract.registerPatient();

            await tx.wait(); // Espere a transação ser confirmada
            toast.success('Paciente cadastrado com sucesso!');

        } catch (error: any) {
            console.log(error);
            // toast.error("error");
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 bg-white rounded-md shadow-lg">
                        <p className="font-medium text-blue-500">Loading...</p>
                    </div>
                </div>
            )}
            <div className="flex flex-col-reverse md:flex-row justify-center min-h-screen">
                <div className="bg-cover w-full h-1/2 md:h-auto md:w-4/5" style={{ backgroundImage: 'url(/image-doctor-login.png)' }}>
                </div>
                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                            Start Using Vitalis Today.
                        </h1>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            Experience a seamless integration of healthcare and technology, tailored to your needs
                        </p>
                        <div className="mt-6">
                            <h1 className="text-gray-500 dark:text-gray-300">Please select your role</h1>
                            <div className="mt-3 md:flex md:items-center md:-mx-2">
                                <button
                                    onClick={() => setActiveButton('doctor')}
                                    className={`flex justify-center w-full px-6 py-3 rounded-lg md:w-auto md:mx-2 focus:outline-none ${activeButton === 'doctor' ? 'bg-blue-500 text-white' : 'border border-blue-500 text-blue-500'}`}>
                                    {/* ... Doctor SVG ... */}
                                    <span className="mx-2">Doctor</span>
                                </button>
                                <button
                                    onClick={() => setActiveButton('patient')}
                                    className={`flex justify-center w-full px-6 py-3 mt-4 rounded-lg md:mt-0 md:w-auto md:mx-2 focus:outline-none ${activeButton === 'patient' ? 'bg-blue-500 text-white' : 'border border-blue-500 text-blue-500'}`}>
                                    {/* ... Patient SVG ... */}
                                    <span className="mx-2">Patient</span>
                                </button>
                            </div>
                        </div>
                        <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" ref={formRef}>

                            {activeButton === 'doctor' && (
                                <>
                                    <div className="md:col-span-2">
                                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Name</label>
                                        <input name="doctorName" type="text" placeholder="Your name" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Registration Id</label>
                                        <input name="doctorCRM" type="text" placeholder="Your identifier as a doctor" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                </>
                            )}
                            <div className="md:col-span-2">
                                <button
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        setLoading(true);
                                        try {
                                            if (activeButton === 'doctor' && formRef.current) {
                                                const formData = new FormData(formRef.current);
                                                const data = {
                                                    doctorName: formData.get('doctorName') as string,
                                                    doctorCRM: formData.get('doctorCRM') as string
                                                };
                                                await onRegisterDoctor(data);
                                            } else if (activeButton === 'patient') {
                                                await onRegisterPatient();
                                            }
                                            handleNavigation(activeButton === 'doctor' ? '/doctor' : '/patient');
                                        } catch (error) {
                                            console.error(error);
                                        } finally {
                                            setLoading(false);
                                        }
                                    }}
                                    type="submit"
                                    className="block w-full px-5 py-3 font-medium text-white transition-colors bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 focus:outline-none focus:ring-offset-2">
                                    Sign Up
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </section >
    );
}

export default SignUpSection;
