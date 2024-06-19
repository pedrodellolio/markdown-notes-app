export function getDefaultContent() {
  return `# Introdução ao Markdown

Markdown é uma linguagem de marcação leve, criada por John Gruber e Aaron Swartz, que permite a formatação de texto de forma simples e intuitiva. É amplamente utilizado em plataformas como GitHub, Reddit, e blogs, devido à sua simplicidade e legibilidade.

## Vantagens do Markdown

- **Simplicidade**: Facilita a escrita e leitura de texto formatado.
- **Portabilidade**: Arquivos de texto em Markdown são pequenos e podem ser facilmente transferidos entre sistemas.
- **Conversão**: Pode ser convertido para diversos formatos, como HTML, PDF, e outros.

## Como Utilizar o Markdown

A seguir, algumas instruções básicas sobre como usar Markdown:

### Cabeçalhos

Os cabeçalhos são definidos usando o símbolo \`#\`. Quanto mais \`#\`, menor o nível do cabeçalho.

\`\`\`markdown
# Cabeçalho de nível 1
## Cabeçalho de nível 2
### Cabeçalho de nível 3
\`\`\`

### Ênfase

Para adicionar ênfase ao texto, você pode usar asteriscos ou sublinhados.

- **Negrito**: Use \`**texto**\` ou \`__texto__\`.
- *Itálico*: Use \`*texto*\` ou \`_texto_\`.
- ~~Tachado~~: Use \`~~texto~~\`.

\`\`\`markdown
**Negrito**
*Itálico*
~~Tachado~~
\`\`\`

### Listas

Você pode criar listas ordenadas e não ordenadas.

- **Listas não ordenadas**: Use \`-\`, \`+\`, ou \`*\`.

\`\`\`markdown
- Item 1
- Item 2
  - Subitem 1
  - Subitem 2
\`\`\`

- **Listas ordenadas**: Use números seguidos de ponto.

\`\`\`markdown
1. Primeiro item
2. Segundo item
   1. Subitem 1
   2. Subitem 2
\`\`\`

### Links

Para criar links, use colchetes \`[]\` para o texto do link e parênteses \`()\` para a URL.

\`\`\`markdown
[OpenAI](https://www.openai.com)
\`\`\`

### Imagens

Para inserir imagens, a sintaxe é similar à dos links, mas com um ponto de exclamação \`!\` antes.

\`\`\`markdown
![Alt text](URL da imagem)
\`\`\`

### Blocos de Código

Para incluir blocos de código, use três crases \`\`\` antes e depois do código.

\`\`\`markdown
\`\`\`
print("Hello, World!")
\`\`\`
\`\`\`

### Citações

Para criar citações, use o símbolo \`>\`.

\`\`\`markdown
> Esta é uma citação.
\`\`\`

### Tabelas

Para criar tabelas, use barras verticais \`|\` e hífens \`-\`.

\`\`\`markdown
| Coluna 1 | Coluna 2 |
|----------|----------|
| Linha 1  | Valor 1  |
| Linha 2  | Valor 2  |
\`\`\`

## Conclusão

Markdown é uma ferramenta poderosa para criar textos formatados de maneira simples e eficiente. Com estas instruções básicas, você já pode começar a utilizar Markdown em seus projetos e documentos.
`;
}
