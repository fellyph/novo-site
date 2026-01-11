---
description: Esse workflow é para criar features utilizando github
---

Este fluxo de trabalho deve ser seguido sempre que uma nova funcionalidade for solicitada.

1. **Inicialização do Repositório**: Antes de qualquer coisa, verifique se o projeto já possui o Git inicializado. Caso contrário, inicialize o repositório.

   ```bash
   git rev-parse --is-inside-work-tree || git init
   ```

2. **Criação de Branch**: Antes de iniciar qualquer implementação, crie uma nova branch a partir da branch principal (main ou trunk).

   ```bash
   git checkout -b feature/[nome-da-funcionalidade]
   ```

3. **Desenvolvimento**: Implemente a funcionalidade na nova branch.

4. **Validação**: Após a implementação, valide as alterações seguindo os fluxos de trabalho de teste apropriados (por exemplo, `/validate-errors` e `/create-e2e-tests`).

5. **Confirmação do Usuário**: Solicite a revisão e confirmação do usuário sobre a funcionalidade implementada.

6. **Merge**: Somente após a confirmação do usuário, mescle a branch da funcionalidade na branch principal.

   ```bash
   git checkout main
   git merge feature/[nome-da-funcionalidade]
   git branch -d feature/[nome-da-funcionalidade]
   ```

7. **Finalização**: Informe ao usuário que a funcionalidade foi integrada com sucesso.
