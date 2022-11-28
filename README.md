# Template para Stack Serverless AWS API Gateway com lambda
  
Stack criada para servir como modelo de implementação inicial de uma stack serverless na AWS, com um exemplo inicial de exposição de um endpoint REST que engatilha um evento em um lambda.
Este template traz consigo algumas recomendações de padronização de desenvolvimento em projetos Serverless com NodeJS implementadas como exemplo, são elas:
- [Padronização de REST API](https://tigestao-smartbank.atlassian.net/wiki/spaces/DES/pages/665616413/REST+API)
- Padronização do uso de Logs com AWS Lambdas
- Padronização convencional de estrutura de diretórios e nomenclaturas de arquivos
- Padronização do uso do Serverless como framework de entrega da stack, com configurações mínimas já preparadas
- Exemplo de implementação de padrão de código em NodeJS

Este template tende a evoluir como qualquer outro projeto ao longo do tempo, portanto recomendamos que a cada criação de projeto ele seja revisitado.

# Antes de alterar este README

Siga as recomendações para a escrita de um novo que está [neste documento](https://tigestao-smartbank.atlassian.net/wiki/spaces/DES/pages/592969733/README).

Abaixo segue uma sugestão de guia.

# Coisas que precisam ser alteradas no template
* No arquivo serverless.yml alterar o nome do serviço para o nome do seu serviço
```yml
service: template-sls-aws-apigateway # mudar o nome do serviço para o nome do seu serviço
```
* No arquivo serverless.yml alterar a tag nivel 2 para o escopo do seu projeto e verificar se o nível 1 faz sentido:
```yml
  stackTags:
    smartbank:cost-center:level0: serverless
    smartbank:cost-center:level1: api-back # verificar se a API está realmente neste escopo
    smartbank:cost-center:level2: template # mudar a tag para o respectivo projeto
```
* No arquivo serverless.yml verificar se a API publicada será interna ou não. Se sim, deixe como está, senão, não se faz necessária a importação do API Gateway interno. Antes de tomar essa decisão, envolva o time de arquitetura e/ou infraestrutura para discutir o que fazer.
```yml
  importApiGateway: # verificar necessidade
    name: ${self:provider.stage}-internal-api
```
* No arquivo package.json alterar o nome do projeto:
```yml
{
  "name": "template-sls-aws-apigateway",
```
* Substituir o arquivo swagger/swagger.yml pelo documento Open API 3 da sua propria API. Se atentar ao contexto da API declarado na listas de servidores por ambiente, no exemplo deste template temos 'template-sls-aws-apigateway':
```yml
servers:
- url: https://05ovjshnib-vpce-015b80d1657e30f4b.execute-api.us-east-2.amazonaws.com/dev/template-sls-aws-apigateway
- url: https://9uhpz1c6a3-vpce-043d09a452aa52824.execute-api.us-east-2.amazonaws.com/hmg/template-sls-aws-apigateway
```
* Remover os arquivos de exemplo nos seguintes diretorios:
    * ~/template-sls-aws-apigateway/config/functions
    * ~/template-sls-aws-apigateway/config/schemas/requestValidation
    * ~/template-sls-aws-apigateway/config/schemas/responseTemplate
    * ~/template-sls-aws-apigateway/src/functions
    * ~/template-sls-aws-apigateway/src/test


# Resumo do fluxo 

Crie aqui um resumo do escopo do qual essa stack entrega. Faça links com documentações corporativas ou referências de implementação se necessário.

---  

# Indíce de conteúdo  

(Publique um sumário do seu documento conforme abaixo)

1. [Requisitos](#markdown-header-1-requisitos)
    - [Configurações](#markdown-header-configuracoes)
2. [Utilização](#markdown-header-2-utilizacao)  
    - [Deploy/Undeploy](#markdown-header-deployundeploy)  
    - [Invocar AWS Lambda locamente](#markdown-header-invocar-aws-lambda-localmente)
    - [Filtros AWS CloudWatch](#markdown-header-filtros-aws-cloudwatch)
3. [Projetos dependentes](#markdown-header-3-projetos-dependentes)

---

## **1. Requisitos**  

É preciso ter instalado em sua máquina as seguintes tecnologias para poder atuar no projeto:  

1. [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)  
2. [Nodejs](https://nodejs.org/en/download/)  
3. [npm](https://www.npmjs.com/get-npm)  
4. [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/) (modo global "-g"):  

  ```bash
    npm install -g serverless
  ```  

5. [VS Code](https://code.visualstudio.com/Download) como IDE sugerida  

### Configurações  

Para testar o projeto em ambiente de desenvolvimento é necessário possuir configurado em sua máquina o AWS CLI, que é o client para publicar o projeto como uma stack via AWS Cloudformation. Para isso, é preciso, com o AWS CLI instalado, abra um prompt de comando e digite o comando a seguir, respondendo as perguntas em seguida conforme o exemplo abaixo, conforme orientado na [documentação oficial](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html):

```bash
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7_EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCY_EXAMPLEKEY
Default region name [None]: us-east-2
Default output format [None]: json
```  

Entre em contato com o time de infraestrutura para obter o **AWS Access Key ID** e o **AWS Secret Access Key** para o ambiente de desenvolvimento.  

---  

## **2. Utilização**  

Para acessar aos recursos publicados é preciso acessar a conta com perfil de desenvolvimento, para isso é necessário configurar uma *role* de desenvolvimento conforme as instruções [deste tópico](#markdown-header-configuracoes).  
  
### **Deploy/Undeploy**  

#### *DEV*

>Apesar do serverless framework prover comandos de [deploy](https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy/)/[undeploy](https://www.serverless.com/framework/docs/providers/aws/cli-reference/remove/) é altamente recomendável a não utilização do mesmo, pois durante o projeto foi encontrado disparidades entre deploy em SO Windows (local) e Linux (feito via Pipeline de entrega do BitBucket).  

Seguir padrões presentes [neste documento](https://tigestao-smartbank.atlassian.net/wiki/spaces/DES/pages/251166781/Pipeline+de+Entrega)  

#### *HMG/PRD*  

Seguir padrões presentes [neste documento](https://tigestao-smartbank.atlassian.net/wiki/spaces/DES/pages/251166781/Pipeline+de+Entrega)  

### **Invocar AWS Lambda localmente**  

>Caso a lambda possua [layers](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html), é necessário fazer o mock das mesmas em seu import da lib:  
  
*Exemplo da lambda RequestValidation:*

```javascript
const lbLog = require('letsbank-logs')
--
const lbLog = require('../../tests/layersMocks/logLayerMock')
// const lbLog = require('letsbank-logs')
```  

Para [invocar a lambda localmente](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke/) é somente ter o payload de entrada esperado, ou até mesmo incluir na linha de comando, o ambiente que será invocado, neste caso DEV:  

```bash
sls invoke local -f RequestValidation --env dev --path tests\payloadMocks\mockRequestValidationDuplicated.json
```  

### **Filtros AWS CloudWatch**  

Escreva abaixo sugestões de filtro de logs no cloudwatch da sua stack


```text
filter @message like 'algumaCoisa'
| fields @timestamp, @message
| sort @timestamp desc
| limit 20
```

---

## **3. Projetos dependentes**  

Caso haja projetos dependentes dessa stack, cite-os aqui.
