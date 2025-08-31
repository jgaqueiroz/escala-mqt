# 📅 Escala MQTs – CBTU Recife

[![Abrir Escala MQTs](https://img.shields.io/badge/🌐%20Acessar%20o%20App-escalamqt.effecta.com.br-blue?style=for-the-badge)](https://escalamqt.effecta.com.br)

Bem-vindo(a) ao **Escala MQTs**, um app simples, rápido e direto para visualizar a **escala anual dos maquinistas da CBTU Recife**.  

Aqui você encontra, de forma organizada, as escalas **A, B, C, D, E, F e R**, com todos os dias do ano e os respectivos turnos destacados. Sem precisar recorrer a tabelas confusas, PDFs escondidos ou planilhas complicadas. 😉

---

## 🚂 O que é esse app?

- Mostra a **escala completa dos maquinistas** para o ano selecionado.  
- Suporte para as escalas de **revezamento**:
  - **A, C, E** → 5 dias de trabalho no turno principal, 1 noite, 3 folgas.  
  - **B, D, F** → 4 dias de trabalho no turno principal, 2 noites, 3 folgas.  
- Suporte para a escala **R (Reforço)** → segunda a sexta.  
- Cada turno é destacado por cor:
  - 🌞 **Trabalho no turno principal**  
  - 🌙 **Trabalho no turno noturno**  
  - 💤 **Folga**  
- Navegação **ano a ano** com botões fixos no rodapé.  
- Seleção rápida da escala (A–F ou R) com menu fixo na parte de baixo.  
- Cabeçalhos dos meses e dias da semana são **fixos ao rolar**, deixando a navegação intuitiva.  
- Design **responsivo e mobile-first**, perfeito para consulta rápida no celular. 📱

---

## 🛠️ Tecnologias usadas

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)  
- TypeScript  
- CSS puro (com variáveis e sticky headers)  
- Deploy automático com GitHub Actions + SSH  

---

## 👩‍💻 Como rodar localmente

Clone o repositório:

```bash
https://github.com/jgaqueiroz/escala-mqt.git
cd escala-mqt
```
Instale as dependências:
```bash
npm install
```
Rode em modo desenvolvimento:
```bash
npm run dev
```
Acesse em: http://localhost:5173

Build de produção:
```bash
npm run build
```
---
## 🌐 Deploy

O app é estático, então o conteúdo do diretório dist/ pode ser hospedado em qualquer servidor web (Apache, Nginx, GitHub Pages, etc.).

Neste projeto usamos deploy automático via GitHub Actions:
a cada git push main, o app é buildado e enviado direto para o servidor.

---

## 🤔 Por que esse app?

Porque consultar a escala dos maquinistas não precisa ser complicado.
Agora você abre o app, escolhe sua escala e pronto: sabe quando vai trabalhar, quando estará à noite e quando pode aproveitar a folga. 🚆✨

---

## ⚖️ Licença

Este projeto é livre para uso e adaptação.
A ideia é simples: facilitar a vida dos maquinistas no dia a dia.