"use client";
import React, { useEffect, useMemo } from "react";

import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { toast } from "react-toastify";
import Page from "../page";
import { ethers } from "ethers";
import { EthersjsNomoSigner } from "ethersjs-nomo-plugins/dist/ethersjs_nomo_signer";
import { zscProvider } from "ethersjs-nomo-plugins/dist/ethersjs_provider";
declare let window: any;

type PatientRecord = {
    timestamp: string;
    conditions: string;
    medications: string;
    observations: string;
    diagnosis: string;
};

const SeePatientRecords = () => {

    const [tableData, setTableData] = React.useState<PatientRecord[]>([]);

    const CONTRACT_ADDRESS = "0x0308a840397048A39B910093eD15E5FFc9bb790F";
    const contractJSON = require('../../utils/NewHealthDashboard.json');

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

    const getRecords: any = async () => {


        try {

            const abi = contractJSON.abi;
            const signer = new EthersjsNomoSigner(zscProvider);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

            const tx = await contract.getUserMedicalRecordsPatient();
            console.log(`Print do tx: `, tx);

            return tx;

        } catch (error) {
            console.log(error);
            console.error("Erro durante ao consultar blockchain:", error);
            toast.error("Ocorreu um erro durante a inicialização da consulta.");
        }
    };

    const getTableData = async () => {
        try {
            const records = await getRecords();
            console.log(records);

            const parsedEntries = records.map((entry: any) => {

                const integerTimestamp = parseInt(ethers.utils.formatUnits(entry.timestamp._hex, 0));
                const date = new Date(integerTimestamp * 1000);
                const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                return {
                    timestamp: formattedDate,
                    conditions: entry.conditions,
                    medications: entry.medications,
                    observations: entry.observations,
                    diagnosis: entry.diagnosis[0]  // Assuming you want the diagnosisName
                }
            });

            setTableData(parsedEntries);
        } catch (error) {
            toast.error("Erro ao carregar dados da tabela:");
            console.log(error);
        }
    };


    useEffect(() => {
        getTableData();
    }, []);

    const columns = useMemo<MRT_ColumnDef<PatientRecord>[]>(
        () => [
            {
                accessorKey: "timestamp",
                header: "Date",
                size: 100,
            },
            {
                accessorKey: "conditions",
                header: "Symptoms",
                size: 150,
            },
            {
                accessorKey: "medications",
                header: "Medications",
                size: 150,
            },
            {
                accessorKey: "observations",
                header: "Observations",
                size: 150,
            },
            {
                accessorKey: "diagnosis",
                header: "Diagnosis",
                size: 150,
            },
        ],
        []
    );

    return (
        <Page
            // classes="min-h-[calc(100vh-4rem)] md:px-10"
            titleLg
            title="Past Consultations"
        >
            <MaterialReactTable
                columns={columns}
                data={tableData}
                positionActionsColumn="last"
            />
        </Page>
    );
};

export default SeePatientRecords;
