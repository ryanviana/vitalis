# HealthChain 🩺

Documento para documentação do protótipo inicial da HealthChain



## Sobre o projeto 📄

A HealthChain, através da tecnologia do blockchain, visa revolucionar os registros médicos, visando a promoção dos Objetivos de Desenvolvimento Sustentável estabelecidos pela ONU.
 
Nossa solução revoluciona o setor de saúde, permitindo um diagnóstico mais preciso e eficiente, contribuindo para a qualidade de vida das pessoas.  

Através da tecnologia Blockchain, garantimos a segurança e integridade dos registros médicos, promovendo a confiança entre pacientes e profissionais de saúde. Nossa plataforma facilita o compartilhamento de informações entre diferentes instituições e regiões, promovendo a interoperabilidade dos dados médicos.

A tecnologia desenvolvida permite que cada paciente tenha um histórico com seus dados de todas as suas consultas (data, sintomas, medicações e observações médicas). Para garantir a privacidade do paciente, somente o médico que estiver atendendo o paciente durante a consulta pode verificar esses dados. Para isso, o paciente realiza o mint de um NFT (ERC1155), que dá acesso aos seu histórico de dados médicos. Para finalizar a consulta, o médico deve chamar uma função no contrato inteligente adicionando os dados dessa consulta e realizando o burn do NFT, o que impede o médico de verificar novamente os dados do paciente após a consulta.

## Sobre os contratos inteligentes 👨‍💻

Basicamente, possuímos os seguintes contratos inteligentes:
- **BokkyPooBahsDateTimeLibrary.sol**: biblioteca utilizada para converter o timestamp para uma data legível e com melhor experiência para o usuário.
- **TimestampToDate.sol**: contrato também utilizando para converter o timestamp para uma data legível em string.
- **PatientMedicalNFT.sol**: contrato que cada usuário deve fazer o deploy através da função **register** em HealthDashboard.sol. Com esse contrato, o paciente consegue mintar os NFTs para cada médico.
- **HealthDashboard.sol**: Contrato com todas as funções que devem ser utilizadas na aplicação. Esse contrato possui as seguintes funções:

**register:** Função que o usuário deve chamar para se cadastrar. Nessa função, é realizada o deploy de um contrato PatientMedicalNFT.sol

**startConsultation:** O paciente deve chamar essa função para iniciar uma consulta. Como parâmetro, o paciente deve passar a wallet do médico para que seja mintado um NFT para o mesmo e ele possa verificar seu histórico médico.

**getUserMedicalRecords:** Função que o médico deve chamar para verificar o histórico médico do paciente. Como parâmetro, ele deve passar a wallet do paciente.

**finishConsultation:** Função que o médico deve chamar para finalizar uma consulta. Ao chamar essa função, o médico insere uma nova consulta no histórico médico do paciente e realiza o burn do NFT. Assim, são adicionados mais dados no histórico do paciente e o médico perde acesso ao histórico médico do paciente.

A cada consulta é adicionado um novo **struct** no histórico do paciente com os seguintes dados:

    struct MedicalConsultationData {
        string date;
        string conditions;
        string medications;
        string observations;
    }

## Rede e blockchain 💻
O deploy do contrato foi realizado na testnet Mumbai (0xd100711c8B42F3e3cf95Da415e77210d13007A59). Vale lembrar que só é necessário realizar o deploy do HealthDashboard.sol, pois, através da função register, esse mesmo contrato realiza o deploy dos contratos de NFTs. Para essa aplicação, notamos que ela pode utilizar a Polygon ou a Arbitrum, pois ambas funcionam muito bem, tem credibilidade no mercado e taxas mais baratas para não encarecer os serviços médicos dos pacientes.

Link no Explorer do contrato na Mumbai: https://mumbai.polygonscan.com/address/0xd100711c8b42f3e3cf95da415e77210d13007a59#code 