"use client";
import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Input from "../input";
import { Button, LoadingState } from "@taikai/rocket-kit";
import { ethers } from "ethers";
import Page from "../page";
import { EthersjsNomoSigner } from "ethersjs-nomo-plugins/dist/ethersjs_nomo_signer";
import { zscProvider } from "ethersjs-nomo-plugins/dist/ethersjs_provider";
declare let window: any;


const StartConsultation = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  const [loading, setLoading] = React.useState(false);

  const CONTRACT_ADDRESS = "0x0308a840397048A39B910093eD15E5FFc9bb790F";
  const contractJSON = require('../../utils/NewHealthDashboard.json');

  // async function getProvider(): Promise<ethers.providers.Web3Provider | null> {
  //   if (!window.ethereum) {
  //     toast.error("Carteira não encontrada!");
  //     return null;
  //   }

  //   try {
  //     await window.ethereum.request({ method: "eth_requestAccounts" });
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     return provider;
  //   } catch (error) {
  //     console.error("Erro ao conectar na Metamask:", error);
  //     toast.error("Erro ao conectar na Metamask.");
  //     return null;
  //   }
  // }

  const onSubmit = async (doctorAddress: string) => {
    setLoading(true);


    try {

      const abi = contractJSON.abi;
      const signer = new EthersjsNomoSigner(zscProvider);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      const tx = await contract.startConsultation(
        doctorAddress, {
        gasLimit: 100000,
        nonce: undefined,
      }
      );

      await tx.wait();

      toast.success("Consultation successfully started!");
      reset();
    } catch (error) {
      console.error("Erro durante a inicialização da consulta:", error);
      toast.error("Ocorreu um erro durante a inicialização da consulta.");
    }
    setLoading(false);
  };

  return (
    <Page title="Start a Consult" classes="grow">
      <p>
        Upon starting the consultation, the doctor will have access to all your medical records until the consultation is concluded.
      </p>
      {!loading ? (
        <form
          className="flex flex-col  gap-4 m-20"
          // onSubmit={handleSubmit(onSubmit)}
          onSubmit={handleSubmit((data) => onSubmit(data.doctorAddress))}
        >
          <Input
            control={control}
            name="doctorAddress"
            errors={errors}
            placeholder="Doctor's Address"
          />
          <div className="flex justify-center m-20">
            <Button
              className="button hover:scale-105 transition mx-auto"
              color="blue500"
              // icon="user-o"
              iconPosition="right"
              txtColor="blue500"
              value="Start Consultation"
              variant="outline"
              type="submit"
            />
          </div>
        </form>
      ) : (
        <LoadingState cardsNumber={8} center lines={14} type="text" />
      )}
    </Page>
  );
};

export default StartConsultation;
