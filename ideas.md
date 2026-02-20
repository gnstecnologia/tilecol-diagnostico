# Ideias de Design — Relatório Diagnóstico Tilecol

## Contexto
Relatório técnico e estratégico de diagnóstico de site para apresentação a um gestor/chefe. Deve ser profissional, claro, com dados visuais e fácil de navegar.

---

<response>
<probability>0.07</probability>
<text>

## Ideia 1: Auditoria Corporativa — Estilo "Consulting Report"

**Design Movement:** Corporate Data Intelligence — inspirado em relatórios de consultorias como McKinsey e Deloitte, com toques de dashboards modernos de SaaS.

**Core Principles:**
1. Hierarquia de informação rígida e clara — o leitor sabe exatamente onde está e o que é mais importante
2. Dados como protagonistas — cada seção é construída em torno de métricas e evidências visuais
3. Neutralidade profissional com toques de cor estratégicos para alertas e prioridades
4. Navegação lateral persistente para acesso rápido a qualquer seção

**Color Philosophy:**
- Fundo: branco quente (#FAFAF8) para não cansar a vista
- Texto primário: grafite escuro (#1A1A2E)
- Acento primário: azul-marinho profundo (#0F3460) — transmite confiança e autoridade
- Acento de alerta: vermelho-alaranjado (#E94560) — para problemas críticos
- Acento de sucesso: verde-esmeralda (#16C79A) — para pontos positivos
- Acento de atenção: âmbar (#F5A623) — para pontos de melhoria

**Layout Paradigm:**
- Sidebar fixa à esquerda com navegação por seções
- Conteúdo principal em coluna central com largura máxima de 860px
- Cards de métricas em grid 2x2 ou 3x3 no topo de cada seção
- Linha do tempo horizontal para o plano de ação

**Signature Elements:**
1. Score cards circulares com gradiente (como o PageSpeed) para as métricas principais
2. Tabelas de prioridade com badges coloridos (ALTA/MÉDIA/BAIXA)
3. Barras de progresso horizontais para métricas de performance

**Interaction Philosophy:**
- Sidebar com scroll spy — item ativo se destaca conforme o usuário rola
- Cards de métricas com hover que revela detalhes adicionais
- Filtros de prioridade na tabela de recomendações

**Animation:**
- Entrada suave dos cards com fade-in + translateY(20px) → 0
- Contadores animados para os números de métricas (0 → valor final)
- Transição suave ao clicar em seção da sidebar

**Typography System:**
- Títulos: "Sora" (bold, 700) — moderno, geométrico, sem ser genérico
- Corpo: "DM Sans" (400/500) — legível, profissional
- Código/métricas: "JetBrains Mono" — para valores técnicos

</text>
</response>

---

**Design escolhido: Ideia 1 — Auditoria Corporativa**

Justificativa: O contexto é um relatório técnico para apresentação a um gestor. O design de "Consulting Report" transmite autoridade, organização e facilita a tomada de decisão. A sidebar fixa permite navegação rápida entre seções, os score cards visuais comunicam as métricas de forma imediata, e a paleta sóbria com acentos estratégicos direciona a atenção para os pontos críticos sem distrair do conteúdo.
