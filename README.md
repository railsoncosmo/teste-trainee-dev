
# Relatório Técnico – Railson Cosmo de Sousa

## 1. Visão Geral da Solução

Este projeto consiste em uma aplicação de gerenciamento de tarefas (to-do list) desenvolvida em Angular. O foco principal foi realizar correções de bugs identificados pelo QA, implementar melhorias solicitadas e garantir que a aplicação esteja funcional e com boa usabilidade.

---

## 2. Como Executar a Aplicação

Siga os passos abaixo para executar o projeto localmente:

```bash
git clone <https://github.com/railsoncosmo/teste-trainee-dev>
cd <teste-trainee-dev>
npm install
npm start
```

---

## 3. Correção dos Erros Iniciais (`npm start`)

### Erros Identificados e Correções:

- **Script de inicialização ausente:**  
  Foi adicionado ao `package.json` o script `"start": "ng serve"` para a inicialização do projeto com comando `npm start`.

- **Erro de importação do `HeaderComponent`:**  
  Corrigido o nome incorreto do arquivo no `layout.module`.

- **Importação ausente do `TodoService`:**  
  O serviço não estava sendo importado no `new-task.component.ts`; o import foi adicionado corretamente.

- **Importação duplicada/incorreta do `HeaderComponent`:**  
  Corrigida a duplicação entre `app.module.ts` e `layout.module.ts`, garantindo o uso correto via `LayoutModule` que dá acesso a todos os componentes filhos.

- **Inclusão desnecessária de fontes no `angular.json`:**  
  Removido o pacote do FontAwesome, que não estava sendo utilizado.

---

## 4. Relatório de Correção de Bugs

1. **Tarefa sendo adicionada duas vezes:**  
   O método `addTodo()` estava sendo chamado duas vezes dentro de `addTask()` — foi removida a duplicação.

2. **Só é possível adicionar uma tarefa após o reload da aplicação:**  
   Existia uma condição `count` que limitava novas adições de tarefas — essa condição foi removida assim possibilitando a adição em realtime.

3. **Texto do botão "Clear All" em inglês:**  
   Alterado para "Limpar Tudo" e aplicado diretamente no componente sem a necessidade do `getLabel`.

4. **Botão "Exibir Tarefas Concluídas" ocultando tarefas:**  
   A função `filteredTodos()` estava com a lógica invertida, exibindo as tarefas incorretamente. Foi ajustada a ordem da filtragem e o valor booleano de controle.

5. **Botão "Ocultar Tarefas Concluídas" exibindo tarefas:**  
   Corrigida a lógica invertida na função `filteredTodos()`.

6. **Limpar tarefas sem confirmação:**  
   Foi implementada uma confirmação com biblioteca SweetAlert2 antes de executar a limpeza.

7. **Remoção de tarefas erradas:**  
   A lógica da função `clearCompletedTasks()` estava invertida, removendo as tarefas incorretas. Foi corrigido o filtro para excluir apenas as tarefas concluídas e adicionada uma verificação para evitar a ação caso não existam tarefas finalizadas.

8. **Botão "Editar" não funcional:**  
   (Pendente - ver Débito Técnico)

9. **Botão "Editar" desalinhado:**  
   Foi adicionado um container `<div>` para alinhar com o botão "Remover".

10. **Botão "Remover" sem indicação de ação destrutiva:**  
    Aplicada cor vermelha via CSS na classe `todo-item-delete`.

11. **Lista sem barra de rolagem:**  
    Foi alterada a propriedade `overflow-y: hidden` para `overflow-y: auto` ao container da lista de tarefas.

12. **Salvar tarefa com título vazio:**  
    Adicionada validação para impedir inserções em branco ou textos apenas com espaços em brancos.

13. **Salvar tarefa com espaços apenas:**  
    Validação aprimorada para impedir títulos compostos somente por espaços fossem adicionados a lista.

---

## 5. Relatório de Implementação de Melhorias

1. **Botão “Ordenar de A a Z”:**  
   Implementado botão com ordenação alfabética com base nos títulos das tarefas, com suporte a ordenação ascendente e descendente.

2. **Adicionar tarefa com tecla `Enter`:**  
   Dentro do pacote HTML foi adicionado evento `(keydown.enter)` no campo de input que permite o submit da função ao usuário clicar no `enter`.

3. **Filtro de palavrões:**  
   Utilizada a biblioteca [badwords](https://github.com/web-mech/badwords). Criado serviço na classe TodoService com métodos: `clean`, `hasProfanity`, `addCustomWords` e `removeWords`, adicionado um regex onde também filtra palavras em outros idiomas com base no objeto auxiliar exportado no pacote `src/app/data/badWords.ts`.

4. **Substituição dos `alert` e `confirm` nativos:**  
   Implementada com a biblioteca [SweetAlert2](https://sweetalert2.github.io/), proporcionando uma experiência mais moderna para o usuário.

5. **Exportar lista de tarefas para PDF:**  
   Implementada a funcionalidade utilizando a biblioteca [jsPDF](https://github.com/parallax/jsPDF). Criado serviço na classe TodoService com método: `generatePdf`.

---

## 6. Relatório de Débito Técnico

As seguintes tarefas não foram implementadas devido às dificuldades descritas:

1. **Permitir a adição de múltiplas tarefas separadas por `|` (pipe):**  
   Dificuldade em implementar a lógica que interpretasse corretamente o entendimento e separação das tarefas digitadas em um único input, garantindo a criação individual de cada tarefa.

2. **Botão “Editar” funcional:**  
   Não foi possível compreender a forma clara a comunicação entre componentes via `@Input` e `@Output` para preencher o campo de edição do titulo e atualizar a tarefa na lista.

---

## 7. Sugestões de Melhorias Futuras

- **Temas claros/escuros para a interface(DarkMode).**
- **Acessibilidade da interface permitir que usuários com deficiência visual possam navegar usando softwares leitores de tela.**
- **Acessibilidade em libras incluir recursos visuais que facilitem a compreensão por usuários surdos,.**
- **Agrupamento de tarefas por categoria.**  
- **Suporte a datas de vencimento e lembretes.**  
- **Alertas de tarefas próximas ao vencimento.**   
- **Integração com API ou utilizar banco de dados noSQL(Firebase, MongoDB).**

---

## 8. Decisões e Considerações

Durante o desenvolvimento, optei por priorizar a clareza do código e a separação de responsabilidades (componentes e serviços). A modularização com `LayoutModule` e `TodoService` facilitou a manutenção e a escalabilidade da aplicação. Em relação às melhorias, busquei equilibrar a entrega com a qualidade da experiência do usuário.

