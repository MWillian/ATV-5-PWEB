# Deliver Tracking API - Atividade 06

Esta API foi desenvolvida para a gestão logística de entregas e motoristas, aplicando padrões de arquitetura avançados como **Repository Pattern** e **Inversão de Dependência**.

## Tecnologias e Arquitetura

- **Node.js + Express**
    
- **Arquitetura:** Controller -> Service -> Repository (In-Memory)
    
- **Design:** Inversão de Dependência (Dependency Injection) via interfaces/contratos.
    
    
## Como Executar

1. Instale as dependências:
    
    ```
    npm install
    ```
    
2. Inicie o servidor:
    
    ```
    npm start
    ```
    
    
##  Documentação da API

###  Motoristas 

#### Criar Motorista

- **URL:** `/motoristas` | **Método:** `POST`
    
- **Corpo:** `{"nome": "Willian", "cpf": "111.222.333-44", "placaVeiculo": "OPA-1346"}`
    
- **Exemplo de Retorno (201):**
    
    ```
    {
      "id": 1,
      "nome": "Willian",
      "placaVeiculo": "OPA-1346",
      "cpf": "11122233344",
      "status": "ATIVO"
    }
    ```
    
- **Erro (409 Conflict):** `{"erro": "Cpf já cadastrado."}`
    

#### Listar Todos os Motoristas

- **URL:** `/motoristas` | **Método:** `GET`
    
- **Exemplo de Retorno:** `[ { "id": 1, ... }, { "id": 2, ... } ]`
    

#### Buscar Motorista por ID

- **URL:** `/motoristas/:id` | **Método:** `GET`
    
- **Exemplo de Retorno:**
    
    ```
    {
      "id": 1,
      "nome": "Matheus",
      "placaVeiculo": "AAA-2223",
      "cpf": "12549383440",
      "status": "ATIVO"
    }
    ```
    

#### Inativar Motorista

- **URL:** `/motoristas/:id/inativar` | **Método:** `PATCH`
    
- **Exemplo de Retorno:** `{"mensagem": "Motorista desativado"}`
    

#### Listar Entregas por Motorista

- **URL:** `/motoristas/:id/entregas` | **Método:** `GET`
    
- **Exemplo de Retorno (com status=CRIADA):**
    
    ```
    [
      {
        "id": 2,
        "descricao": "Entrega de milho",
        "status": "CRIADA",
        "historico": [ ... ]
      }
    ]
    ```
    

### Entregas

#### Criar Entrega

- **URL:** `/entregas` | **Método:** `POST`
    
- **Exemplo de Retorno:** `{"id": 1, "descricao": "Entrega de milho", "status": "CRIADA", ...}`
    

#### Atribuir Motorista

- **URL:** `/entregas/:id/atribuir` | **Método:** `PATCH`
    
- **Corpo:** `{"motoristaId": "2"}`
    
- **Sucesso (200):** `{"mensagem": "Entrega atribuida com sucesso ao motorista."}`
    
- **Erro (422 - Status Inválido):** `{"erro": "Só é possível atribuir um motorista para uma entrega recém criada."}`
    
- **Erro (422 - Motorista Inativo):** `{"erro": "Motorista inativo."}`
    

#### Avançar Estado

- **URL:** `/entregas/:id/avancar` | **Método:** `PATCH`
    
- **Exemplo de Retorno:**
    
    ```
    {
      "mensagem": "Status avançado com sucesso",
      "entrega": {
        "id": 1,
        "status": "EM_TRANSITO",
        "historico": [
          { "data": "30/3/2026", "descricacao": "CRIADA" },
          { "data": "30/3/2026", "descricacao": "EM_TRANSITO" }
        ]
      }
    }
    ```
    

#### Histórico de Eventos

- **URL:** `/entregas/:id/historico` | **Método:** `GET`
    
- **Exemplo de Retorno:**
    
    ```
    [
      { "data": "30/3/2026", "descricacao": "CRIADA" }
    ]
    ```
    

## Regras de Negócio e Validações (Status HTTP)

| Cenário                          | Status HTTP         | Mensagem de Erro / Comportamento                                               |
| -------------------------------- | ------------------- | ------------------------------------------------------------------------------ |
| **CPF Duplicado**                | `409 Conflict`      | `"erro": "Cpf já cadastrado."`                                                 |
| **Atribuição Inválida (Status)** | `422 Unprocessable` | `"erro": "Só é possível atribuir um motorista para uma entrega recém criada."` |
| **Motorista Inativo**            | `422 Unprocessable` | `"erro": "Motorista inativo."`                                                 |
| **Histórico**                    | `200 OK`            | Eventos de atribuição e mudança de status são registrados automaticamente.     |

## Diagrama de Dependências

A aplicação segue o princípio da **Inversão de Dependência**, onde os services dependem de abstrações (contratos/interfaces) e não de classes concretas.

```
[ Database ]
     ▼
[ EntregasRepository ] <----- Contrato: IEntregasRepository
[ MotoristasRepository ] <--- Contrato: IMotoristasRepository
     ▼
[ EntregasService ] <------- Recebe Repositories via Constructor
[ MotoristasService ] <----- Recebe Repository via Constructor
     ▼
[ Controllers ] <----------- Orquestram os inputs/outputs
```

### Testes no Postman

Uma coleção completa do Postman com todos os cenários de sucesso e erro (409, 422, 404) está disponível na pasta `/postman` do repositório.