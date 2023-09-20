"use client";
import { DataWarning, LoadingState, TextField } from "@taikai/rocket-kit";
import React, { useCallback, useEffect } from "react";
import TaikaiCard from "../taikaiCard";
import { axios } from "@/config/axios";
import { toast } from "react-toastify";

const SearchSection: React.FC = () => {
    return (
        <section>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="py-12 md:py-20">
    
              {/* Section header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sobre nós!</h2>
            <p className="text-lg md:text-xl text-blue-600 font-semibold">Conheça mais sobre os benefícios do nosso sistema</p>
                </div>
    
              {/* Items */}
              <div className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none" data-aos-id-blocks>

                {/* 1st item */}
                <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
                  <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <rect className="fill-current text-blue-600" width="64" height="64" rx="32" />
                    <path stroke-linecap="round" className="fill-current text-blue-100" transform="translate(19, 19)" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />                  
                    </svg>
                  <h4 className="h4 mb-2">Inteligência Artificial</h4>
                  <p className="text-lg text-gray-400 text-center">Permita que seu médico tome decisões data-driven!</p>
                </div>

    
                {/* 2nd item */}
                <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="100" data-aos-anchor="[data-aos-id-blocks]">
                  <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <circle className="fill-current text-blue-600" cx="32" cy="32" r="32" />
                    <path className="stroke-current text-blue-100" strokeWidth="2" strokeLinecap="square" d="M21 23h22v18H21z" fill="none" fillRule="evenodd" />
                    <path className="stroke-current text-blue-300" d="M26 28h12M26 32h12M26 36h5" strokeWidth="2" strokeLinecap="square" />
                  </svg>
                  <h4 className="h4 mb-2">Auditável</h4>
                  <p className="text-lg text-gray-400 text-center">Todo acompanhamento médico é registrado e não pode ser alterado!</p>
                </div>
    
                {/* 3rd item */}
                <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-delay="200" data-aos-anchor="[data-aos-id-blocks]">
                  <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <rect className="fill-current text-blue-600" width="64" height="64" rx="32" />
                    <g transform="translate(21 21)" strokeLinecap="square" strokeWidth="2" fill="none" fillRule="evenodd">
                      <ellipse className="stroke-current text-blue-300" cx="11" cy="11" rx="5.5" ry="11" />
                      <path className="stroke-current text-blue-100" d="M11 0v22M0 11h22" />
                      <circle className="stroke-current text-blue-100" cx="11" cy="11" r="11" />
                    </g>
                  </svg>
                  <h4 className="h4 mb-2">Interoperabilidade</h4>
                  <p className="text-lg text-gray-400 text-center">Compatibilidade global entre diferentes clínicas e hospitais.</p>
                </div>


                {/* 4rd item */}
                <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
                  <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <rect className="fill-current text-blue-600" width="64" height="64" rx="32" />
                    <path stroke-linecap="round" fill="none" className="stroke-current text-blue-100" transform="translate(19, 19)" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />                  
                    </svg>
                  <h4 className="h4 mb-2">Baixos custos</h4>
                  <p className="text-lg text-gray-400 text-center">Tecnologia de ponta, eficiente e que cabe no bolso!</p>
                </div>

                {/* 5 item */}
                <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
                  <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <rect className="fill-current text-blue-600" width="64" height="64" rx="32" />
                    <path stroke-linecap="round" fill="none" className="stroke-current text-blue-100" transform="translate(19, 19)" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />                  
                    </svg>
                  <h4 className="h4 mb-2">Privacidade</h4>
                  <p className="text-lg text-gray-400 text-center">Garanta que seus dados estejam seguros!</p>
                </div>


                {/* 6 item */}
                <div className="relative flex flex-col items-center" data-aos="fade-up" data-aos-anchor="[data-aos-id-blocks]">
                  <svg className="w-16 h-16 mb-4" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <rect className="fill-current text-blue-600" width="64" height="64" rx="32" />
                    <path stroke-linecap="round" fill="none" className="stroke-current text-blue-100" transform="translate(19, 19)" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />                  
                    </svg>
                  <h4 className="h4 mb-2">Digitalização</h4>
                  <p className="text-lg text-gray-400 text-center">Todos os dados estão digitalizados!</p>
                </div>
                
                
              </div>
            </div>
          </div>
        </section>
      );
};

export default SearchSection;
