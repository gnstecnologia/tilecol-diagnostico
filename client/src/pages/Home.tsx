/**
 * Design System: Auditoria Corporativa — Consulting Report Style
 * Sidebar fixa, score cards animados, tabelas de prioridade com badges coloridos
 * Paleta: navy (#0F3460), vermelho (#E94560), verde (#16C79A), âmbar (#F5A623)
 * Tipografia: Sora (headings) + DM Sans (body) + JetBrains Mono (métricas)
 */

import { useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavSection {
  id: string;
  label: string;
  icon: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const NAV_SECTIONS: NavSection[] = [
  { id: "resumo", label: "Resumo Executivo", icon: "📊" },
  { id: "performance", label: "Performance", icon: "⚡" },
  { id: "seo", label: "SEO", icon: "🔍" },
  { id: "rastreamento", label: "Rastreamento & Dados", icon: "📡" },
  { id: "ux", label: "UX & Conversão", icon: "🎯" },
  { id: "acessibilidade", label: "Acessibilidade", icon: "♿" },
  { id: "plano", label: "Plano de Ação", icon: "🚀" },
];

// ─── Score Ring Component ──────────────────────────────────────────────────────
function ScoreRing({
  score,
  label,
  color,
  size = 120,
}: {
  score: number;
  label: string;
  color: string;
  size?: number;
}) {
  const [animated, setAnimated] = useState(0);
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animated / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = () => {
    if (score >= 90) return "#16C79A";
    if (score >= 50) return "#F5A623";
    return "#E94560";
  };

  const ringColor = color || getColor();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E8ECF0"
            strokeWidth="10"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={ringColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 1.5s ease-in-out" }}
          />
        </svg>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span
            className="text-2xl font-bold"
            style={{ color: ringColor, lineHeight: 1 }}
          >
            {score}
          </span>
          <span className="text-xs text-gray-400 mt-0.5">/100</span>
        </div>
      </div>
      <span
        className="text-sm font-semibold text-center"
        style={{ fontFamily: "'Sora', sans-serif", color: "#1A1A2E" }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── MetricCard Component ──────────────────────────────────────────────────────
function MetricCard({
  label,
  value,
  unit,
  status,
  description,
  target,
}: {
  label: string;
  value: string | number;
  unit?: string;
  status: "good" | "warning" | "bad";
  description: string;
  target?: string;
}) {
  const statusConfig = {
    good: { color: "#16C79A", bg: "rgba(22,199,154,0.08)", icon: "✓", label: "Bom" },
    warning: { color: "#F5A623", bg: "rgba(245,166,35,0.08)", icon: "!", label: "Atenção" },
    bad: { color: "#E94560", bg: "rgba(233,69,96,0.08)", icon: "✗", label: "Crítico" },
  };
  const cfg = statusConfig[status];

  return (
    <div
      className="rounded-xl p-5 border transition-all duration-200 hover:shadow-md"
      style={{
        background: "white",
        borderColor: "#E8ECF0",
        borderLeft: `4px solid ${cfg.color}`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "#8892A4", fontFamily: "'DM Sans', sans-serif" }}
        >
          {label}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: cfg.bg, color: cfg.color }}
        >
          {cfg.label}
        </span>
      </div>
      <div className="flex items-baseline gap-1 mb-1">
        <span
          className="text-3xl font-bold"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: cfg.color,
          }}
        >
          {value}
        </span>
        {unit && (
          <span className="text-sm font-medium" style={{ color: "#8892A4" }}>
            {unit}
          </span>
        )}
      </div>
      {target && (
        <div className="text-xs mb-2" style={{ color: "#8892A4" }}>
          Meta: <span style={{ color: "#16C79A" }}>{target}</span>
        </div>
      )}
      <p className="text-sm" style={{ color: "#5A6478", lineHeight: 1.5 }}>
        {description}
      </p>
    </div>
  );
}

// ─── Priority Badge ────────────────────────────────────────────────────────────
function PriorityBadge({ level }: { level: "ALTA" | "MÉDIA" | "BAIXA" }) {
  const config = {
    ALTA: "badge-high",
    MÉDIA: "badge-medium",
    BAIXA: "badge-low",
  };
  return (
    <span
      className={`${config[level]} text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap`}
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      {level}
    </span>
  );
}

// ─── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({
  status,
}: {
  status: "Instalado" | "Ausente" | "Parcial" | "Crítico";
}) {
  const config = {
    Instalado: { bg: "rgba(22,199,154,0.12)", color: "#0d9e7a", border: "rgba(22,199,154,0.3)" },
    Ausente: { bg: "rgba(233,69,96,0.12)", color: "#c0293e", border: "rgba(233,69,96,0.3)" },
    Parcial: { bg: "rgba(245,166,35,0.12)", color: "#c47a00", border: "rgba(245,166,35,0.3)" },
    Crítico: { bg: "rgba(233,69,96,0.12)", color: "#c0293e", border: "rgba(233,69,96,0.3)" },
  };
  const cfg = config[status];
  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
        fontFamily: "'Sora', sans-serif",
      }}
    >
      {status}
    </span>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({
  id,
  icon,
  title,
  subtitle,
}: {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div id={id} className="mb-8 pt-2">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <h2
          className="text-2xl font-bold"
          style={{ fontFamily: "'Sora', sans-serif", color: "#1A1A2E" }}
        >
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-base" style={{ color: "#5A6478", marginLeft: "44px" }}>
          {subtitle}
        </p>
      )}
      <div
        className="mt-4"
        style={{
          height: "2px",
          background: "linear-gradient(to right, #0F3460, transparent)",
          borderRadius: "1px",
        }}
      />
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  const [activeSection, setActiveSection] = useState("resumo");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setSidebarOpen(false);
    }
  };

  // Chart data
  const performanceData = [
    { name: "Desempenho\n(Mobile)", value: 56, fill: "#E94560" },
    { name: "Acessibilidade", value: 90, fill: "#F5A623" },
    { name: "Boas Práticas", value: 92, fill: "#16C79A" },
    { name: "SEO", value: 92, fill: "#16C79A" },
  ];

  const cwvData = [
    { metric: "LCP", valor: 13.1, meta: 2.5, status: "bad" },
    { metric: "FCP", valor: 4.8, meta: 1.8, status: "bad" },
    { metric: "TTFB", valor: 3.0, meta: 0.8, status: "bad" },
    { metric: "TBT", valor: 0.3, meta: 0.2, status: "warning" },
    { metric: "CLS", valor: 0.014, meta: 0.1, status: "good" },
    { metric: "INP", valor: 0.117, meta: 0.2, status: "good" },
  ];

  const trackingData = [
    { tool: "Google Tag Manager", id: "GTM-NXQ497H9", status: "Instalado" as const, obs: "Presente e carregando corretamente" },
    { tool: "Google Analytics 4", id: "GT-5R82NQZ", status: "Parcial" as const, obs: "Instalado via GTM, mas sem eventos customizados configurados" },
    { tool: "Google Ads", id: "AW-11413068050", status: "Instalado" as const, obs: "Tag de conversão ativa" },
    { tool: "Meta Pixel (Facebook)", id: "—", status: "Ausente" as const, obs: "Sem rastreamento para campanhas no Meta Ads" },
    { tool: "LinkedIn Insight Tag", id: "—", status: "Ausente" as const, obs: "Relevante para B2B; ausente" },
    { tool: "Eventos de Formulário", id: "—", status: "Ausente" as const, obs: "Envios de formulário não rastreados" },
    { tool: "Rastreamento de Funil", id: "—", status: "Ausente" as const, obs: "Sem visibilidade sobre jornada do usuário" },
    { tool: "Página de Obrigado", id: "—", status: "Ausente" as const, obs: "Impossibilita mensuração de conversões" },
  ];

  const actionPlan = [
    {
      priority: "ALTA" as const,
      action: "Otimização de Imagens e Cache do Servidor",
      area: "Performance",
      impact: "Reduzir LCP de 13,1s para < 2,5s",
      effort: "Médio",
      detail: "Converter imagens para WebP/AVIF, implementar lazy loading correto, configurar cache headers (Cache-Control), remover CSS/JS não utilizado (economia estimada de 618 KiB).",
    },
    {
      priority: "ALTA" as const,
      action: "Reformulação dos CTAs e Formulários de Produto",
      area: "Conversão (CRO)",
      impact: "Aumentar taxa de conversão de leads",
      effort: "Baixo",
      detail: "Substituir formulário de 8 campos nas páginas de produto por CTA direto 'Solicitar Orçamento' com apenas Nome, Email e Telefone. Criar página de Obrigado para rastreamento.",
    },
    {
      priority: "ALTA" as const,
      action: "Implementar Rastreamento de Eventos no GTM",
      area: "Dados & Analytics",
      impact: "Visibilidade completa da jornada do usuário",
      effort: "Médio",
      detail: "Configurar eventos: clique em CTAs, envio de formulários, scroll depth (25/50/75/100%), clique em telefone/WhatsApp, visualização de categorias de produto.",
    },
    {
      priority: "MÉDIA" as const,
      action: "Correção do SEO Técnico",
      area: "SEO",
      impact: "Melhorar ranking e CTR orgânico",
      effort: "Baixo",
      detail: "Adicionar meta descrições únicas em todas as páginas (ausentes em 100% das páginas verificadas), corrigir hierarquia de headings (H3 antes de H2), adicionar Open Graph tags.",
    },
    {
      priority: "MÉDIA" as const,
      action: "Instalação dos Pixels de Meta e LinkedIn",
      area: "Marketing & Dados",
      impact: "Habilitar remarketing e lookalike audiences",
      effort: "Baixo",
      detail: "Instalar Meta Pixel via GTM com eventos padrão (PageView, ViewContent, Lead). Instalar LinkedIn Insight Tag para audiências B2B. Configurar conversões no Meta Ads.",
    },
    {
      priority: "MÉDIA" as const,
      action: "Reduzir Bloqueio de Renderização",
      area: "Performance",
      impact: "Economia estimada de 4.400ms no carregamento",
      effort: "Alto",
      detail: "Adiar carregamento de 40+ arquivos CSS/JS não críticos. Consolidar folhas de estilo de plugins. Implementar Critical CSS inline para o conteúdo above-the-fold.",
    },
    {
      priority: "BAIXA" as const,
      action: "Correção das Falhas de Acessibilidade",
      area: "UX & Acessibilidade",
      impact: "Inclusividade e conformidade WCAG",
      effort: "Baixo",
      detail: "Corrigir contraste de cor insuficiente em textos descritivos (ex: descrições de produtos). Adicionar nomes acessíveis aos links de imagem. Corrigir ordem sequencial de headings.",
    },
    {
      priority: "BAIXA" as const,
      action: "Revisão de Links Quebrados e Redirecionamentos",
      area: "Manutenção Técnica",
      impact: "Experiência de navegação fluida",
      effort: "Baixo",
      detail: "Auditar e corrigir links que retornam 404. Implementar redirecionamentos 301 para URLs antigas. Revisar estrutura de permalinks dos produtos.",
    },
  ];

  const cssPayloadData = [
    { name: "CSS Não Utilizado", value: 303, fill: "#E94560" },
    { name: "JS Não Utilizado", value: 315, fill: "#F5A623" },
    { name: "Imagens Não Otimizadas", value: 780, fill: "#0F3460" },
    { name: "Sem Cache", value: 3431, fill: "#8892A4" },
  ];

  const threadData = [
    { name: "Avaliação de Scripts", value: 889, fill: "#E94560" },
    { name: "Style & Layout", value: 487, fill: "#F5A623" },
    { name: "Outros", value: 421, fill: "#8892A4" },
    { name: "Compilação JS", value: 392, fill: "#0F3460" },
    { name: "Parse HTML/CSS", value: 154, fill: "#16C79A" },
    { name: "Renderização", value: 139, fill: "#5A6478" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF8" }}>
      {/* ── Mobile Header ── */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ background: "#0F3460", color: "white" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
            style={{ background: "#E94560", fontFamily: "'Sora', sans-serif" }}
          >
            T
          </div>
          <span className="font-semibold text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>
            Diagnóstico Tilecol
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {sidebarOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </header>

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-transform duration-300 no-print
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ width: "260px", background: "#0F3460", color: "white" }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{ background: "#E94560", fontFamily: "'Sora', sans-serif" }}
            >
              T
            </div>
            <div>
              <div className="font-bold text-sm" style={{ fontFamily: "'Sora', sans-serif" }}>
                Tilecol
              </div>
              <div className="text-xs opacity-60">tilecol.com.br</div>
            </div>
          </div>
          <div
            className="text-xs font-semibold uppercase tracking-widest opacity-60"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Relatório de Diagnóstico
          </div>
          <div className="text-xs opacity-40 mt-0.5">Fevereiro 2026</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {NAV_SECTIONS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`w-full text-left px-5 py-3 flex items-center gap-3 text-sm transition-all duration-150
                ${activeSection === id ? "sidebar-item-active" : "hover:bg-white/5 opacity-75 hover:opacity-100"}`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: activeSection === id ? "white" : "rgba(255,255,255,0.8)",
                borderLeft: activeSection === id ? "3px solid #E94560" : "3px solid transparent",
                background: activeSection === id ? "rgba(255,255,255,0.1)" : undefined,
                fontWeight: activeSection === id ? 600 : 400,
              }}
            >
              <span className="text-base">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div
          className="p-4 text-xs opacity-40 border-t"
          style={{ borderColor: "rgba(255,255,255,0.1)", fontFamily: "'DM Sans', sans-serif" }}
        >
          Análise realizada em 20/02/2026
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main
        ref={mainRef}
        className="lg:ml-[260px] pt-16 lg:pt-0"
        style={{ minHeight: "100vh" }}
      >
        {/* Top Banner */}
        <div
          className="px-8 py-10 border-b"
          style={{
            background: "linear-gradient(135deg, #0F3460 0%, #1a4a7a 100%)",
            borderColor: "#E8ECF0",
          }}
        >
          <div className="max-w-4xl">
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-70"
              style={{ color: "#E94560", fontFamily: "'DM Sans', sans-serif" }}
            >
              Diagnóstico Técnico e Estratégico
            </div>
            <h1
              className="text-3xl lg:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "'Sora', sans-serif", lineHeight: 1.2 }}
            >
              Análise Completa do Site
              <br />
              <span style={{ color: "#F5A623" }}>tilecol.com.br</span>
            </h1>
            <p
              className="text-base max-w-2xl"
              style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}
            >
              Diagnóstico técnico e estratégico abrangendo performance, SEO, rastreamento de dados,
              experiência do usuário e conversão. Elaborado com base em análise do PageSpeed Insights,
              inspeção direta do site e auditoria de código.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              {[
                { label: "Data da Análise", value: "20 Fev 2026" },
                { label: "Plataforma", value: "WordPress + Elementor" },
                { label: "Ferramenta", value: "PageSpeed + Auditoria Manual" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="px-4 py-2 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <div className="text-xs opacity-60 text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {item.label}
                  </div>
                  <div
                    className="text-sm font-semibold text-white"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-6 lg:px-10 py-10 max-w-5xl">

          {/* ── RESUMO EXECUTIVO ── */}
          <SectionHeading
            id="resumo"
            icon="📊"
            title="Resumo Executivo"
            subtitle="Visão geral dos pontos críticos identificados e scores do Lighthouse"
          />

          {/* Lighthouse Scores */}
          <div
            className="rounded-2xl p-6 mb-8 border"
            style={{ background: "white", borderColor: "#E8ECF0" }}
          >
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-6"
              style={{ color: "#8892A4", fontFamily: "'Sora', sans-serif" }}
            >
              Scores do Lighthouse (Mobile — Moto G Power emulado)
            </h3>
            <div className="flex flex-wrap justify-around gap-6">
              <ScoreRing score={56} label="Desempenho" color="#E94560" />
              <ScoreRing score={90} label="Acessibilidade" color="#F5A623" />
              <ScoreRing score={92} label="Boas Práticas" color="#16C79A" />
              <ScoreRing score={92} label="SEO" color="#16C79A" />
            </div>
            <div
              className="mt-6 p-4 rounded-xl text-sm"
              style={{ background: "rgba(233,69,96,0.06)", borderLeft: "4px solid #E94560" }}
            >
              <strong style={{ color: "#E94560" }}>⚠ Atenção Crítica:</strong>{" "}
              <span style={{ color: "#5A6478" }}>
                A pontuação de Desempenho de <strong>56/100</strong> no mobile é o problema mais urgente do site.
                Ela impacta diretamente a experiência do usuário, a taxa de rejeição e o ranking no Google.
                As Core Web Vitals estão <strong>reprovadas</strong> nos dados reais de campo (CrUX).
              </span>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[
              { label: "Problemas Críticos", value: "4", unit: "encontrados", status: "bad" as const, description: "Performance, meta descriptions ausentes, eventos de rastreamento e formulários com alta fricção." },
              { label: "Pontos de Melhoria", value: "8", unit: "identificados", status: "warning" as const, description: "Pixels de mídia, acessibilidade, hierarquia de headings, CTAs e estrutura de conversão." },
              { label: "Pontos Positivos", value: "5", unit: "confirmados", status: "good" as const, description: "GTM instalado, GA4 ativo, Google Ads configurado, identidade visual consistente, responsividade básica." },
            ].map((card) => (
              <MetricCard key={card.label} {...card} />
            ))}
          </div>

          {/* ── PERFORMANCE ── */}
          <SectionHeading
            id="performance"
            icon="⚡"
            title="Performance Técnica"
            subtitle="Análise detalhada das métricas de velocidade e Core Web Vitals"
          />

          {/* CWV Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <MetricCard label="LCP (Mobile)" value="13,1" unit="s" status="bad" description="Largest Contentful Paint. Meta: ≤ 2,5s. Está 5,2× acima do limite aceitável." target="≤ 2,5s" />
            <MetricCard label="FCP (Mobile)" value="4,8" unit="s" status="bad" description="First Contentful Paint. Meta: ≤ 1,8s. O usuário espera quase 5 segundos para ver qualquer conteúdo." target="≤ 1,8s" />
            <MetricCard label="TTFB (Campo)" value="3,0" unit="s" status="bad" description="Time to First Byte. Meta: ≤ 0,8s. O servidor demora muito para responder — indica falta de cache." target="≤ 0,8s" />
            <MetricCard label="TBT (Mobile)" value="300" unit="ms" status="warning" description="Total Blocking Time. Meta: ≤ 200ms. Scripts de terceiros (GTM/Google Ads) são os maiores contribuintes." target="≤ 200ms" />
            <MetricCard label="CLS (Campo)" value="0" unit="" status="good" description="Cumulative Layout Shift. Excelente! O layout não se move durante o carregamento." target="≤ 0,1" />
            <MetricCard label="INP (Campo)" value="117" unit="ms" status="good" description="Interaction to Next Paint. Bom! A interatividade responde rapidamente após o carregamento." target="≤ 200ms" />
          </div>

          {/* Thread Main Work Chart */}
          <div
            className="rounded-2xl p-6 mb-8 border"
            style={{ background: "white", borderColor: "#E8ECF0" }}
          >
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-1"
              style={{ color: "#8892A4", fontFamily: "'Sora', sans-serif" }}
            >
              Trabalho da Thread Principal — 2,5 segundos totais
            </h3>
            <p className="text-sm mb-6" style={{ color: "#5A6478" }}>
              Distribuição do tempo gasto processando scripts, estilos e renderização no carregamento inicial
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={threadData} layout="vertical" margin={{ left: 20, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }} tickFormatter={(v) => `${v}ms`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fontFamily: "'DM Sans', sans-serif" }} width={130} />
                <Tooltip
                  formatter={(value) => [`${value}ms`, "Tempo"]}
                  contentStyle={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, borderRadius: 8 }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {threadData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Payload Chart */}
          <div
            className="rounded-2xl p-6 mb-12 border"
            style={{ background: "white", borderColor: "#E8ECF0" }}
          >
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-1"
              style={{ color: "#8892A4", fontFamily: "'Sora', sans-serif" }}
            >
              Oportunidades de Economia de Dados (KiB)
            </h3>
            <p className="text-sm mb-6" style={{ color: "#5A6478" }}>
              Total de payload da página: <strong style={{ fontFamily: "'JetBrains Mono', monospace" }}>4.114 KiB</strong> — muito acima do recomendado de 1.600 KiB
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={cssPayloadData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {cssPayloadData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} KiB`, "Economia possível"]}
                    contentStyle={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, borderRadius: 8 }}
                  />
                  <Legend
                    formatter={(value) => <span style={{ fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col justify-center gap-3">
                {cssPayloadData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ background: item.fill }} />
                      <span className="text-sm" style={{ color: "#5A6478", fontFamily: "'DM Sans', sans-serif" }}>
                        {item.name}
                      </span>
                    </div>
                    <span
                      className="text-sm font-semibold"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: "#1A1A2E" }}
                    >
                      {item.value} KiB
                    </span>
                  </div>
                ))}
                <div
                  className="mt-2 pt-3 border-t flex items-center justify-between"
                  style={{ borderColor: "#E8ECF0" }}
                >
                  <span className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>Total de Economia Possível</span>
                  <span
                    className="text-base font-bold"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: "#16C79A" }}
                  >
                    4.829 KiB
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── SEO ── */}
          <SectionHeading
            id="seo"
            icon="🔍"
            title="SEO Técnico"
            subtitle="Análise da estrutura de otimização para mecanismos de busca"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <MetricCard label="Score SEO (Lighthouse)" value="92" unit="/100" status="good" description="A estrutura básica de SEO está boa: canonical, hreflang, robots.txt e links rastreáveis estão corretos." />
            <MetricCard label="Meta Descriptions" value="0%" unit="das páginas" status="bad" description="Nenhuma página verificada possui meta description. Isso reduz o CTR nos resultados de busca e impede que o Google exiba uma descrição relevante." />
          </div>

          <div
            className="rounded-2xl border overflow-hidden mb-8"
            style={{ background: "white", borderColor: "#E8ECF0" }}
          >
            <div className="px-6 py-4 border-b" style={{ borderColor: "#E8ECF0" }}>
              <h3
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "#8892A4", fontFamily: "'Sora', sans-serif" }}
              >
                Checklist de SEO Técnico
              </h3>
            </div>
            <div className="divide-y" style={{ borderColor: "#F5F6F8" }}>
              {[
                { item: "Canonical URL configurada", status: true, obs: "Presente em todas as páginas verificadas" },
                { item: "Hreflang válido (pt-BR)", status: true, obs: "Configurado corretamente" },
                { item: "robots.txt válido", status: true, obs: "Permite indexação corretamente" },
                { item: "Título da página (title tag)", status: true, obs: "Presente, mas genérico na home ('Tilecol')" },
                { item: "Meta Description", status: false, obs: "AUSENTE em todas as páginas verificadas" },
                { item: "Open Graph Tags (og:title, og:description, og:image)", status: false, obs: "Completamente ausentes — prejudica compartilhamento em redes sociais" },
                { item: "Schema Markup (JSON-LD)", status: false, obs: "Ausente — oportunidade para rich snippets nos resultados de busca" },
                { item: "Hierarquia de Headings (H1→H2→H3)", status: false, obs: "Ordem não sequencial: H3 aparece antes de H2 em várias seções" },
                { item: "Alt text em imagens", status: true, obs: "Maioria das imagens possui atributo alt" },
                { item: "Core Web Vitals aprovadas", status: false, obs: "REPROVADO — LCP de 5,2s no campo (75° percentil)" },
              ].map((row) => (
                <div key={row.item} className="px-6 py-3.5 flex items-start gap-4">
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: row.status ? "rgba(22,199,154,0.12)" : "rgba(233,69,96,0.12)",
                      color: row.status ? "#0d9e7a" : "#c0293e",
                    }}
                  >
                    {row.status ? "✓" : "✗"}
                  </span>
                  <div className="flex-1">
                    <div
                      className="text-sm font-medium"
                      style={{ color: "#1A1A2E", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {row.item}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "#8892A4" }}>
                      {row.obs}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RASTREAMENTO ── */}
          <SectionHeading
            id="rastreamento"
            icon="📡"
            title="Rastreamento & Qualidade de Dados"
            subtitle="Diagnóstico da estrutura de analytics, pixels e mensuração de conversões"
          />

          <div
            className="rounded-2xl border overflow-hidden mb-8"
            style={{ background: "white", borderColor: "#E8ECF0" }}
          >
            <div className="px-6 py-4 border-b" style={{ borderColor: "#E8ECF0" }}>
              <h3
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "#8892A4", fontFamily: "'Sora', sans-serif" }}
              >
                Inventário de Ferramentas de Rastreamento
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: "#F8F9FB" }}>
                    {["Ferramenta", "ID / Status", "Status", "Observação"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "#8892A4", fontFamily: "'Sora', sans-serif" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "#F5F6F8" }}>
                  {trackingData.map((row) => (
                    <tr key={row.tool} className="hover:bg-gray-50 transition-colors">
                      <td
                        className="px-5 py-3.5 text-sm font-medium"
                        style={{ color: "#1A1A2E", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {row.tool}
                      </td>
                      <td
                        className="px-5 py-3.5 text-sm"
                        style={{ fontFamily: "'JetBrains Mono', monospace", color: "#5A6478", fontSize: "12px" }}
                      >
                        {row.id}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusBadge status={row.status} />
                      </td>
                      <td
                        className="px-5 py-3.5 text-sm"
                        style={{ color: "#5A6478", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {row.obs}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Data Quality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div
              className="rounded-xl p-5 border"
              style={{ background: "rgba(233,69,96,0.04)", borderColor: "rgba(233,69,96,0.2)" }}
            >
              <h4
                className="text-sm font-bold mb-3"
                style={{ color: "#E94560", fontFamily: "'Sora', sans-serif" }}
              >
                ⚠ Problemas Críticos de Dados
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: "#5A6478", fontFamily: "'DM Sans', sans-serif" }}>
                <li>• Sem rastreamento de envio de formulários → impossível medir leads gerados</li>
                <li>• Sem página de Obrigado → conversões não são contabilizadas como metas</li>
                <li>• Sem rastreamento de cliques em CTAs → sem dados de engajamento</li>
                <li>• Sem funil de conversão configurado → não há visibilidade sobre abandono</li>
                <li>• Meta Pixel ausente → impossível criar audiências para Meta Ads</li>
              </ul>
            </div>
            <div
              className="rounded-xl p-5 border"
              style={{ background: "rgba(22,199,154,0.04)", borderColor: "rgba(22,199,154,0.2)" }}
            >
              <h4
                className="text-sm font-bold mb-3"
                style={{ color: "#16C79A", fontFamily: "'Sora', sans-serif" }}
              >
                ✓ O que está funcionando
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: "#5A6478", fontFamily: "'DM Sans', sans-serif" }}>
                <li>• GTM instalado e funcionando — base sólida para implementações futuras</li>
                <li>• GA4 carregando via GTM — boa prática de gerenciamento</li>
                <li>• Google Ads configurado com ID de conversão (AW-11413068050)</li>
                <li>• Linker de domínio configurado para rastreamento cross-domain</li>
                <li>• Pageviews sendo registradas automaticamente</li>
              </ul>
            </div>
          </div>

          {/* ── UX & CONVERSÃO ── */}
          <SectionHeading
            id="ux"
            icon="🎯"
            title="UX & Conversão"
            subtitle="Análise da jornada do usuário, CTAs e estrutura de geração de leads"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <MetricCard label="Campos no Formulário de Produto" value="8" unit="campos" status="bad" description="Nome, Email, Empresa, CNPJ, Estado, Cidade, Assunto e Mensagem. Excesso de fricção para um primeiro contato. O CNPJ especialmente cria barreira para usuários em fase de pesquisa." target="3–4 campos" />
            <MetricCard label="Página de Obrigado" value="Ausente" unit="" status="bad" description="Após envio do formulário, o usuário não é redirecionado para uma página de confirmação. Impossibilita rastreamento de conversões e não oferece próximo passo." />
          </div>

          <div
            className="rounded-2xl border overflow-hidden mb-8"
            style={{ background: "white", borderColor: "#E8ECF0" }}
          >
            <div className="px-6 py-4 border-b" style={{ borderColor: "#E8ECF0" }}>
              <h3
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "#8892A4", fontFamily: "'Sora', sans-serif" }}
              >
                Análise da Jornada do Usuário
              </h3>
            </div>
            <div className="p-6">
              {/* Journey Steps */}
              <div className="flex flex-col gap-4">
                {[
                  { step: "1", label: "Chegada ao Site", status: "warning", desc: "Usuário aguarda 4,8s para ver o primeiro conteúdo (FCP). Alta taxa de abandono antes mesmo de ver a proposta de valor." },
                  { step: "2", label: "Navegação pelo Catálogo", status: "good", desc: "Categorias bem definidas. Filtros disponíveis (Categoria, Área, Aplicação, Ambiente). Boa organização visual dos produtos." },
                  { step: "3", label: "Visualização do Produto", status: "warning", desc: "Página de produto com informações técnicas adequadas. Porém, sem preço, sem estoque, sem indicação clara de como adquirir o produto." },
                  { step: "4", label: "Tentativa de Contato", status: "bad", desc: "Formulário com 8 campos obrigatórios, incluindo CNPJ. Alta fricção. Usuário pode desistir antes de completar o formulário." },
                  { step: "5", label: "Pós-Conversão", status: "bad", desc: "Sem página de Obrigado. Sem confirmação visual do envio. Sem próximo passo sugerido. Experiência incompleta." },
                ].map((item) => {
                  const colors = {
                    good: { bg: "rgba(22,199,154,0.08)", border: "#16C79A", num: "#16C79A" },
                    warning: { bg: "rgba(245,166,35,0.08)", border: "#F5A623", num: "#F5A623" },
                    bad: { bg: "rgba(233,69,96,0.08)", border: "#E94560", num: "#E94560" },
                  };
                  const cfg = colors[item.status as keyof typeof colors];
                  return (
                    <div
                      key={item.step}
                      className="flex gap-4 p-4 rounded-xl"
                      style={{ background: cfg.bg, borderLeft: `4px solid ${cfg.border}` }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ background: cfg.border, color: "white", fontFamily: "'Sora', sans-serif" }}
                      >
                        {item.step}
                      </div>
                      <div>
                        <div
                          className="text-sm font-semibold mb-1"
                          style={{ color: "#1A1A2E", fontFamily: "'Sora', sans-serif" }}
                        >
                          {item.label}
                        </div>
                        <div className="text-sm" style={{ color: "#5A6478", fontFamily: "'DM Sans', sans-serif" }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── ACESSIBILIDADE ── */}
          <SectionHeading
            id="acessibilidade"
            icon="♿"
            title="Acessibilidade"
            subtitle="Conformidade com WCAG e boas práticas de inclusividade"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <MetricCard label="Score de Acessibilidade" value="90" unit="/100" status="warning" description="Pontuação razoável, mas com falhas importantes que afetam usuários com deficiência visual e usuários de leitores de tela." />
            <MetricCard label="Falhas de Contraste" value="8+" unit="elementos" status="bad" description="Textos descritivos com contraste insuficiente identificados pelo Lighthouse. Dificulta leitura para usuários com baixa visão." />
          </div>

          <div
            className="rounded-2xl border overflow-hidden mb-12"
            style={{ background: "white", borderColor: "#E8ECF0" }}
          >
            <div className="px-6 py-4 border-b" style={{ borderColor: "#E8ECF0" }}>
              <h3
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "#8892A4", fontFamily: "'Sora', sans-serif" }}
              >
                Falhas de Acessibilidade Identificadas
              </h3>
            </div>
            <div className="divide-y" style={{ borderColor: "#F5F6F8" }}>
              {[
                { issue: "Contraste de cor insuficiente", severity: "Médio", detail: "Textos como 'Soluções completas para obras de sucesso' e 'Nossos produtos estão presentes em mais de 2.500 pontos de venda' não atingem a taxa de contraste WCAG AA (4.5:1)." },
                { issue: "Links sem nome compreensível", severity: "Alto", detail: "Links de imagens de produtos não possuem texto descritivo ou aria-label. Usuários de leitores de tela não conseguem entender o destino do link." },
                { issue: "Hierarquia de headings não sequencial", severity: "Médio", detail: "H3 ('NOSSAS SOLUÇÕES') aparece antes de H2 em algumas seções. Prejudica a navegação por leitores de tela." },
                { issue: "Ausência de landmark principal", severity: "Baixo", detail: "O documento não possui um ponto de referência principal (<main>), dificultando a navegação por tecnologias assistivas." },
              ].map((row) => {
                const sevColors = {
                  Alto: { bg: "rgba(233,69,96,0.08)", color: "#c0293e" },
                  Médio: { bg: "rgba(245,166,35,0.08)", color: "#c47a00" },
                  Baixo: { bg: "rgba(22,199,154,0.08)", color: "#0d9e7a" },
                };
                const sev = sevColors[row.severity as keyof typeof sevColors];
                return (
                  <div key={row.issue} className="px-6 py-4 flex items-start gap-4">
                    <span
                      className="mt-0.5 flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: sev.bg, color: sev.color }}
                    >
                      {row.severity}
                    </span>
                    <div>
                      <div
                        className="text-sm font-medium mb-1"
                        style={{ color: "#1A1A2E", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {row.issue}
                      </div>
                      <div className="text-sm" style={{ color: "#8892A4" }}>
                        {row.detail}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── PLANO DE AÇÃO ── */}
          <SectionHeading
            id="plano"
            icon="🚀"
            title="Plano de Ação Priorizado"
            subtitle="Recomendações ordenadas por impacto e urgência para maximizar resultados"
          />

          <div
            className="rounded-2xl border overflow-hidden mb-8"
            style={{ background: "white", borderColor: "#E8ECF0" }}
          >
            <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "#E8ECF0" }}>
              <h3
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "#8892A4", fontFamily: "'Sora', sans-serif" }}
              >
                Tabela de Recomendações
              </h3>
              <div className="flex gap-2 text-xs">
                {(["ALTA", "MÉDIA", "BAIXA"] as const).map((p) => (
                  <PriorityBadge key={p} level={p} />
                ))}
              </div>
            </div>
            <div className="divide-y" style={{ borderColor: "#F5F6F8" }}>
              {actionPlan.map((item, i) => (
                <div key={i} className="px-6 py-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <PriorityBadge level={item.priority} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4
                          className="text-sm font-semibold"
                          style={{ color: "#1A1A2E", fontFamily: "'Sora', sans-serif" }}
                        >
                          {item.action}
                        </h4>
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ background: "#F0F2F5", color: "#5A6478", fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {item.area}
                        </span>
                      </div>
                      <div
                        className="text-xs mb-2"
                        style={{ color: "#16C79A", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        🎯 Impacto: {item.impact}
                      </div>
                      <p className="text-sm" style={{ color: "#5A6478", lineHeight: 1.6 }}>
                        {item.detail}
                      </p>
                    </div>
                    <div
                      className="flex-shrink-0 text-xs px-2 py-1 rounded"
                      style={{
                        background: item.effort === "Alto" ? "rgba(233,69,96,0.08)" : item.effort === "Médio" ? "rgba(245,166,35,0.08)" : "rgba(22,199,154,0.08)",
                        color: item.effort === "Alto" ? "#c0293e" : item.effort === "Médio" ? "#c47a00" : "#0d9e7a",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Esforço: {item.effort}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Closing Note */}
          <div
            className="rounded-2xl p-8 mb-12"
            style={{
              background: "linear-gradient(135deg, #0F3460 0%, #1a4a7a 100%)",
              color: "white",
            }}
          >
            <h3
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Conclusão e Próximos Passos
            </h3>
            <p
              className="text-base mb-4"
              style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}
            >
              O site da Tilecol possui uma base sólida de identidade e conteúdo, mas enfrenta desafios
              técnicos críticos que limitam seu potencial de geração de leads e visibilidade orgânica.
              A prioridade imediata deve ser a <strong style={{ color: "#F5A623" }}>otimização de performance</strong> —
              um LCP de 13,1 segundos no mobile significa que mais da metade dos usuários abandona o site
              antes de ver qualquer conteúdo.
            </p>
            <p
              className="text-base mb-6"
              style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}
            >
              Em paralelo, a <strong style={{ color: "#F5A623" }}>implementação de rastreamento de eventos</strong> no
              GTM e a <strong style={{ color: "#F5A623" }}>reformulação dos formulários de produto</strong> são ações
              de baixo esforço e alto impacto que podem ser executadas rapidamente para melhorar a mensuração
              e a taxa de conversão.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { phase: "Fase 1 (Imediato)", items: ["Otimizar imagens para WebP", "Configurar cache do servidor", "Reformular formulário de produto"] },
                { phase: "Fase 2 (30 dias)", items: ["Implementar eventos no GTM", "Instalar Meta Pixel", "Adicionar meta descriptions"] },
                { phase: "Fase 3 (60 dias)", items: ["Reduzir CSS/JS não utilizado", "Criar página de Obrigado", "Corrigir acessibilidade"] },
              ].map((phase) => (
                <div
                  key={phase.phase}
                  className="rounded-xl p-4"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="text-xs font-bold mb-2"
                    style={{ color: "#F5A623", fontFamily: "'Sora', sans-serif" }}
                  >
                    {phase.phase}
                  </div>
                  <ul className="space-y-1">
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        → {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className="text-center py-6 border-t text-xs"
            style={{ borderColor: "#E8ECF0", color: "#8892A4", fontFamily: "'DM Sans', sans-serif" }}
          >
            Diagnóstico elaborado em 20 de fevereiro de 2026 · Site analisado: tilecol.com.br ·
            Ferramentas: Google PageSpeed Insights (Lighthouse 13.0.1), Chrome DevTools, Auditoria Manual
          </div>
        </div>
      </main>
    </div>
  );
}
