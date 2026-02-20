/**
 * Design System: Tilecol Modern Audit Report
 * Paleta: Laranja vibrante (#FF8C00) + Cinza escuro + Branco
 * Componentes: Score rings animados, gráficos Recharts, sidebar moderna, cards com hover
 * Logo: Tilecol branca em fundos laranja
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
  { id: "rastreamento", label: "Rastreamento", icon: "📡" },
  { id: "ux", label: "UX & Conversão", icon: "🎯" },
  { id: "acessibilidade", label: "Acessibilidade", icon: "♿" },
  { id: "plano", label: "Plano de Ação", icon: "🚀" },
];

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663370803495/BLeQiUyMtcXjHxha.png";

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
    if (score >= 90) return "#10B981";
    if (score >= 50) return "#F59E0B";
    return "#DC2626";
  };

  const ringColor = color || getColor();

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg] score-ring">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E8EAED"
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
            style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
          />
        </svg>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ fontFamily: "'Inter', sans-serif" }}
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
        style={{ color: "#1A1A2E" }}
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
    good: { color: "#10B981", bg: "rgba(16,185,129,0.08)", icon: "✓", label: "Bom" },
    warning: { color: "#F59E0B", bg: "rgba(245,158,11,0.08)", icon: "!", label: "Atenção" },
    bad: { color: "#DC2626", bg: "rgba(220,38,38,0.08)", icon: "✗", label: "Crítico" },
  };
  const cfg = statusConfig[status];

  return (
    <div
      className="metric-card rounded-xl p-5 border bg-white transition-all duration-300 hover:shadow-lg"
      style={{
        borderColor: "#E8EAED",
        borderLeft: `4px solid ${cfg.color}`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "#8892A4" }}
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
          style={{ color: cfg.color }}
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
          Meta: <span style={{ color: "#10B981" }}>{target}</span>
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
    Instalado: { bg: "rgba(16,185,129,0.12)", color: "#065F46", border: "rgba(16,185,129,0.3)" },
    Ausente: { bg: "rgba(220,38,38,0.12)", color: "#991B1B", border: "rgba(220,38,38,0.3)" },
    Parcial: { bg: "rgba(245,158,11,0.12)", color: "#92400E", border: "rgba(245,158,11,0.3)" },
    Crítico: { bg: "rgba(220,38,38,0.12)", color: "#991B1B", border: "rgba(220,38,38,0.3)" },
  };
  const cfg = config[status];
  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
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
          style={{ color: "#1A1A2E" }}
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
        className="mt-4 gradient-divider"
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
    { name: "Desempenho\n(Mobile)", value: 56, fill: "#DC2626" },
    { name: "Acessibilidade", value: 90, fill: "#F59E0B" },
    { name: "Boas Práticas", value: 92, fill: "#10B981" },
    { name: "SEO", value: 92, fill: "#10B981" },
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
    { tool: "Google Analytics 4", id: "GT-5R82NQZ", status: "Parcial" as const, obs: "Instalado via GTM, mas sem eventos customizados" },
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
      detail: "Converter imagens para WebP/AVIF, implementar lazy loading, configurar cache headers, remover CSS/JS não utilizado.",
    },
    {
      priority: "ALTA" as const,
      action: "Reformulação dos CTAs e Formulários",
      area: "Conversão (CRO)",
      impact: "Aumentar taxa de conversão de leads",
      effort: "Baixo",
      detail: "Substituir formulário de 8 campos por CTA direto com 3 campos. Criar página de Obrigado para rastreamento.",
    },
    {
      priority: "ALTA" as const,
      action: "Implementar Rastreamento de Eventos no GTM",
      area: "Dados & Analytics",
      impact: "Visibilidade completa da jornada do usuário",
      effort: "Médio",
      detail: "Configurar eventos: clique em CTAs, envio de formulários, scroll depth, clique em telefone/WhatsApp.",
    },
    {
      priority: "MÉDIA" as const,
      action: "Correção do SEO Técnico",
      area: "SEO",
      impact: "Melhorar ranking e CTR orgânico",
      effort: "Baixo",
      detail: "Adicionar meta descriptions, corrigir hierarquia de headings, adicionar Open Graph tags.",
    },
    {
      priority: "MÉDIA" as const,
      action: "Instalação dos Pixels de Meta e LinkedIn",
      area: "Marketing & Dados",
      impact: "Habilitar remarketing e lookalike audiences",
      effort: "Baixo",
      detail: "Instalar Meta Pixel via GTM com eventos padrão. Instalar LinkedIn Insight Tag para audiências B2B.",
    },
    {
      priority: "MÉDIA" as const,
      action: "Reduzir Bloqueio de Renderização",
      area: "Performance",
      impact: "Economia estimada de 4.400ms",
      effort: "Alto",
      detail: "Adiar carregamento de 40+ arquivos CSS/JS não críticos. Implementar Critical CSS inline.",
    },
    {
      priority: "BAIXA" as const,
      action: "Correção das Falhas de Acessibilidade",
      area: "UX & Acessibilidade",
      impact: "Inclusividade e conformidade WCAG",
      effort: "Baixo",
      detail: "Corrigir contraste de cor, adicionar nomes acessíveis aos links, corrigir ordem de headings.",
    },
    {
      priority: "BAIXA" as const,
      action: "Revisão de Links Quebrados",
      area: "Manutenção Técnica",
      impact: "Experiência de navegação fluida",
      effort: "Baixo",
      detail: "Auditar e corrigir links 404. Implementar redirecionamentos 301. Revisar permalinks.",
    },
  ];

  const cssPayloadData = [
    { name: "CSS Não Utilizado", value: 303, fill: "#DC2626" },
    { name: "JS Não Utilizado", value: 315, fill: "#F59E0B" },
    { name: "Imagens Não Otimizadas", value: 780, fill: "#FF8C00" },
    { name: "Sem Cache", value: 3431, fill: "#8892A4" },
  ];

  const threadData = [
    { name: "Avaliação de Scripts", value: 889, fill: "#DC2626" },
    { name: "Style & Layout", value: 487, fill: "#F59E0B" },
    { name: "Outros", value: 421, fill: "#8892A4" },
    { name: "Compilação JS", value: 392, fill: "#FF8C00" },
    { name: "Parse HTML/CSS", value: 154, fill: "#10B981" },
    { name: "Renderização", value: 139, fill: "#5A6478" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#F8F9FA" }}>
      {/* ── Mobile Header ── */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ background: "#FF8C00", color: "white", boxShadow: "0 2px 12px rgba(255, 140, 0, 0.15)" }}
      >
        <div className="flex items-center gap-2">
          <img src={LOGO_URL} alt="Tilecol" className="h-6 w-auto" />
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg transition-all"
          style={{ background: "rgba(255,255,255,0.15)" }}
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
        style={{ width: "260px", background: "#FF8C00" }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
          <img src={LOGO_URL} alt="Tilecol" className="w-full h-auto mb-4" style={{ maxHeight: "50px" }} />
          <div
            className="text-xs font-semibold uppercase tracking-widest opacity-80"
            style={{ color: "white" }}
          >
            Relatório de Diagnóstico
          </div>
          <div className="text-xs opacity-60 mt-0.5" style={{ color: "white" }}>Fevereiro 2026</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {NAV_SECTIONS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`w-full text-left px-5 py-3 flex items-center gap-3 text-sm transition-all duration-150`}
              style={{
                color: activeSection === id ? "white" : "rgba(255,255,255,0.75)",
                background: activeSection === id ? "rgba(255,255,255,0.15)" : undefined,
                borderLeft: activeSection === id ? "3px solid white" : "3px solid transparent",
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
          className="p-4 text-xs opacity-60 border-t"
          style={{ borderColor: "rgba(255,255,255,0.15)", color: "white" }}
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
          className="px-8 py-12 border-b"
          style={{
            background: "linear-gradient(135deg, #FF8C00 0%, #E67E00 100%)",
            borderColor: "#E8EAED",
            boxShadow: "0 4px 20px rgba(255, 140, 0, 0.15)",
          }}
        >
          <div className="max-w-4xl">
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-80"
              style={{ color: "white" }}
            >
              Diagnóstico Técnico e Estratégico
            </div>
            <h1
              className="text-3xl lg:text-4xl font-bold text-white mb-3"
              style={{ lineHeight: 1.2 }}
            >
              Análise Completa do Site
              <br />
              <span style={{ color: "rgba(255,255,255,0.9)" }}>tilecol.com.br</span>
            </h1>
            <p
              className="text-base max-w-2xl"
              style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}
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
                  style={{ background: "rgba(255,255,255,0.12)" }}
                >
                  <div className="text-xs opacity-70 text-white">
                    {item.label}
                  </div>
                  <div
                    className="text-sm font-semibold text-white"
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
            className="rounded-2xl p-8 mb-8 border bg-white"
            style={{ borderColor: "#E8EAED", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-8"
              style={{ color: "#8892A4" }}
            >
              Scores do Lighthouse (Mobile — Moto G Power emulado)
            </h3>
            <div className="flex flex-wrap justify-around gap-8">
              <ScoreRing score={56} label="Desempenho" color="#DC2626" />
              <ScoreRing score={90} label="Acessibilidade" color="#F59E0B" />
              <ScoreRing score={92} label="Boas Práticas" color="#10B981" />
              <ScoreRing score={92} label="SEO" color="#10B981" />
            </div>
            <div
              className="mt-8 p-5 rounded-xl text-sm"
              style={{ background: "rgba(220, 38, 38, 0.06)", borderLeft: "4px solid #DC2626" }}
            >
              <strong style={{ color: "#DC2626" }}>⚠ Atenção Crítica:</strong>{" "}
              <span style={{ color: "#5A6478" }}>
                A pontuação de Desempenho de <strong>56/100</strong> no mobile é o problema mais urgente.
                Impacta a experiência do usuário, taxa de rejeição e ranking no Google.
                As Core Web Vitals estão <strong>reprovadas</strong> nos dados reais de campo.
              </span>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {[
              { label: "Problemas Críticos", value: "4", unit: "encontrados", status: "bad" as const, description: "Performance, meta descriptions, eventos e formulários com alta fricção." },
              { label: "Pontos de Melhoria", value: "8", unit: "identificados", status: "warning" as const, description: "Pixels de mídia, acessibilidade, hierarquia de headings e CTAs." },
              { label: "Pontos Positivos", value: "5", unit: "confirmados", status: "good" as const, description: "GTM, GA4, Google Ads, identidade visual e responsividade." },
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
            <MetricCard label="LCP (Mobile)" value="13,1" unit="s" status="bad" description="Largest Contentful Paint. Meta: ≤ 2,5s. Está 5,2× acima do limite." target="≤ 2,5s" />
            <MetricCard label="FCP (Mobile)" value="4,8" unit="s" status="bad" description="First Contentful Paint. Meta: ≤ 1,8s. Usuário espera quase 5 segundos." target="≤ 1,8s" />
            <MetricCard label="TTFB (Campo)" value="3,0" unit="s" status="bad" description="Time to First Byte. Meta: ≤ 0,8s. Falta de cache no servidor." target="≤ 0,8s" />
            <MetricCard label="TBT (Mobile)" value="300" unit="ms" status="warning" description="Total Blocking Time. Meta: ≤ 200ms. Scripts de terceiros são os maiores contribuintes." target="≤ 200ms" />
            <MetricCard label="CLS (Campo)" value="0" unit="" status="good" description="Cumulative Layout Shift. Excelente! O layout não se move durante carregamento." target="≤ 0,1" />
            <MetricCard label="INP (Campo)" value="117" unit="ms" status="good" description="Interaction to Next Paint. Bom! A interatividade responde rapidamente." target="≤ 200ms" />
          </div>

          {/* Thread Main Work Chart */}
          <div
            className="rounded-2xl p-8 mb-8 border bg-white"
            style={{ borderColor: "#E8EAED", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-1"
              style={{ color: "#8892A4" }}
            >
              Trabalho da Thread Principal — 2,5 segundos totais
            </h3>
            <p className="text-sm mb-6" style={{ color: "#5A6478" }}>
              Distribuição do tempo gasto processando scripts, estilos e renderização
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={threadData} layout="vertical" margin={{ left: 20, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}ms`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={130} />
                <Tooltip
                  formatter={(value) => [`${value}ms`, "Tempo"]}
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
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
            className="rounded-2xl p-8 mb-12 border bg-white"
            style={{ borderColor: "#E8EAED", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-1"
              style={{ color: "#8892A4" }}
            >
              Oportunidades de Economia de Dados (KiB)
            </h3>
            <p className="text-sm mb-6" style={{ color: "#5A6478" }}>
              Total de payload: <strong>4.114 KiB</strong> — muito acima do recomendado de 1.600 KiB
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
                    formatter={(value) => [`${value} KiB`, "Economia"]}
                    contentStyle={{ fontSize: 12, borderRadius: 8 }}
                  />
                  <Legend
                    formatter={(value) => <span style={{ fontSize: 11 }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col justify-center gap-3">
                {cssPayloadData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ background: item.fill }} />
                      <span className="text-sm" style={{ color: "#5A6478" }}>
                        {item.name}
                      </span>
                    </div>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#1A1A2E" }}
                    >
                      {item.value} KiB
                    </span>
                  </div>
                ))}
                <div
                  className="mt-2 pt-3 border-t flex items-center justify-between"
                  style={{ borderColor: "#E8EAED" }}
                >
                  <span className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>Total de Economia</span>
                  <span
                    className="text-base font-bold"
                    style={{ color: "#10B981" }}
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
            <MetricCard label="Score SEO (Lighthouse)" value="92" unit="/100" status="good" description="Estrutura básica boa: canonical, hreflang, robots.txt e links rastreáveis." />
            <MetricCard label="Meta Descriptions" value="0%" unit="das páginas" status="bad" description="Nenhuma página possui meta description. Reduz CTR nos resultados de busca." />
          </div>

          <div
            className="rounded-2xl border overflow-hidden mb-8 bg-white"
            style={{ borderColor: "#E8EAED", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <div className="px-8 py-5 border-b" style={{ borderColor: "#E8EAED" }}>
              <h3
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "#8892A4" }}
              >
                Checklist de SEO Técnico
              </h3>
            </div>
            <div className="divide-y" style={{ borderColor: "#F5F6F8" }}>
              {[
                { item: "Canonical URL configurada", status: true, obs: "Presente em todas as páginas" },
                { item: "Hreflang válido (pt-BR)", status: true, obs: "Configurado corretamente" },
                { item: "robots.txt válido", status: true, obs: "Permite indexação corretamente" },
                { item: "Título da página (title tag)", status: true, obs: "Presente, mas genérico" },
                { item: "Meta Description", status: false, obs: "AUSENTE em todas as páginas" },
                { item: "Open Graph Tags", status: false, obs: "Completamente ausentes" },
                { item: "Schema Markup (JSON-LD)", status: false, obs: "Ausente — oportunidade para rich snippets" },
                { item: "Hierarquia de Headings", status: false, obs: "Ordem não sequencial" },
                { item: "Alt text em imagens", status: true, obs: "Maioria possui atributo alt" },
                { item: "Core Web Vitals aprovadas", status: false, obs: "REPROVADO — LCP de 5,2s no campo" },
              ].map((row) => (
                <div key={row.item} className="px-8 py-3.5 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: row.status ? "rgba(16,185,129,0.12)" : "rgba(220,38,38,0.12)",
                      color: row.status ? "#065F46" : "#991B1B",
                    }}
                  >
                    {row.status ? "✓" : "✗"}
                  </span>
                  <div className="flex-1">
                    <div
                      className="text-sm font-medium"
                      style={{ color: "#1A1A2E" }}
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
            className="rounded-2xl border overflow-hidden mb-8 bg-white"
            style={{ borderColor: "#E8EAED", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <div className="px-8 py-5 border-b" style={{ borderColor: "#E8EAED" }}>
              <h3
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "#8892A4" }}
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
                        className="px-8 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "#8892A4" }}
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
                        className="px-8 py-3.5 text-sm font-medium"
                        style={{ color: "#1A1A2E" }}
                      >
                        {row.tool}
                      </td>
                      <td
                        className="px-8 py-3.5 text-sm"
                        style={{ color: "#5A6478", fontSize: "12px" }}
                      >
                        {row.id}
                      </td>
                      <td className="px-8 py-3.5">
                        <StatusBadge status={row.status} />
                      </td>
                      <td
                        className="px-8 py-3.5 text-sm"
                        style={{ color: "#5A6478" }}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            <div
              className="rounded-xl p-6 border"
              style={{ background: "rgba(220, 38, 38, 0.04)", borderColor: "rgba(220, 38, 38, 0.2)" }}
            >
              <h4
                className="text-sm font-bold mb-3"
                style={{ color: "#DC2626" }}
              >
                ⚠ Problemas Críticos de Dados
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: "#5A6478" }}>
                <li>• Sem rastreamento de envio de formulários</li>
                <li>• Sem página de Obrigado</li>
                <li>• Sem rastreamento de cliques em CTAs</li>
                <li>• Sem funil de conversão configurado</li>
                <li>• Meta Pixel ausente</li>
              </ul>
            </div>
            <div
              className="rounded-xl p-6 border"
              style={{ background: "rgba(16, 185, 129, 0.04)", borderColor: "rgba(16, 185, 129, 0.2)" }}
            >
              <h4
                className="text-sm font-bold mb-3"
                style={{ color: "#10B981" }}
              >
                ✓ O que está funcionando
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: "#5A6478" }}>
                <li>• GTM instalado e funcionando</li>
                <li>• GA4 carregando via GTM</li>
                <li>• Google Ads configurado</li>
                <li>• Linker de domínio configurado</li>
                <li>• Pageviews sendo registradas</li>
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
            <MetricCard label="Campos no Formulário" value="8" unit="campos" status="bad" description="Excesso de fricção. CNPJ cria barreira para usuários em fase de pesquisa." target="3–4 campos" />
            <MetricCard label="Página de Obrigado" value="Ausente" unit="" status="bad" description="Sem confirmação visual. Impossibilita rastreamento de conversões." />
          </div>

          <div
            className="rounded-2xl border overflow-hidden mb-8 bg-white"
            style={{ borderColor: "#E8EAED", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <div className="px-8 py-5 border-b" style={{ borderColor: "#E8EAED" }}>
              <h3
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "#8892A4" }}
              >
                Análise da Jornada do Usuário
              </h3>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-4">
                {[
                  { step: "1", label: "Chegada ao Site", status: "warning", desc: "Usuário aguarda 4,8s para ver o primeiro conteúdo. Alta taxa de abandono." },
                  { step: "2", label: "Navegação pelo Catálogo", status: "good", desc: "Categorias bem definidas. Filtros disponíveis. Boa organização visual." },
                  { step: "3", label: "Visualização do Produto", status: "warning", desc: "Informações técnicas adequadas. Sem preço, sem estoque, sem indicação clara." },
                  { step: "4", label: "Tentativa de Contato", status: "bad", desc: "Formulário com 8 campos obrigatórios. Alta fricção. Usuário pode desistir." },
                  { step: "5", label: "Pós-Conversão", status: "bad", desc: "Sem página de Obrigado. Sem confirmação visual. Experiência incompleta." },
                ].map((item) => {
                  const colors = {
                    good: { bg: "rgba(16,185,129,0.08)", border: "#10B981", num: "#10B981" },
                    warning: { bg: "rgba(245,158,11,0.08)", border: "#F59E0B", num: "#F59E0B" },
                    bad: { bg: "rgba(220,38,38,0.08)", border: "#DC2626", num: "#DC2626" },
                  };
                  const cfg = colors[item.status as keyof typeof colors];
                  return (
                    <div
                      key={item.step}
                      className="flex gap-4 p-4 rounded-xl transition-all hover:shadow-md"
                      style={{ background: cfg.bg, borderLeft: `4px solid ${cfg.border}` }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                        style={{ background: cfg.border, color: "white" }}
                      >
                        {item.step}
                      </div>
                      <div>
                        <div
                          className="text-sm font-semibold mb-1"
                          style={{ color: "#1A1A2E" }}
                        >
                          {item.label}
                        </div>
                        <div className="text-sm" style={{ color: "#5A6478" }}>
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
            <MetricCard label="Score de Acessibilidade" value="90" unit="/100" status="warning" description="Pontuação razoável, mas com falhas que afetam usuários com deficiência visual." />
            <MetricCard label="Falhas de Contraste" value="8+" unit="elementos" status="bad" description="Textos descritivos com contraste insuficiente. Dificulta leitura." />
          </div>

          <div
            className="rounded-2xl border overflow-hidden mb-12 bg-white"
            style={{ borderColor: "#E8EAED", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <div className="px-8 py-5 border-b" style={{ borderColor: "#E8EAED" }}>
              <h3
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "#8892A4" }}
              >
                Falhas de Acessibilidade Identificadas
              </h3>
            </div>
            <div className="divide-y" style={{ borderColor: "#F5F6F8" }}>
              {[
                { issue: "Contraste de cor insuficiente", severity: "Médio", detail: "Textos descritivos não atingem taxa de contraste WCAG AA (4.5:1)." },
                { issue: "Links sem nome compreensível", severity: "Alto", detail: "Links de imagens não possuem texto descritivo ou aria-label." },
                { issue: "Hierarquia de headings não sequencial", severity: "Médio", detail: "H3 aparece antes de H2 em algumas seções." },
                { issue: "Ausência de landmark principal", severity: "Baixo", detail: "Documento não possui ponto de referência principal (<main>)." },
              ].map((row) => {
                const sevColors = {
                  Alto: { bg: "rgba(220,38,38,0.08)", color: "#991B1B" },
                  Médio: { bg: "rgba(245,158,11,0.08)", color: "#92400E" },
                  Baixo: { bg: "rgba(16,185,129,0.08)", color: "#065F46" },
                };
                const sev = sevColors[row.severity as keyof typeof sevColors];
                return (
                  <div key={row.issue} className="px-8 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                    <span
                      className="mt-0.5 text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: sev.bg, color: sev.color }}
                    >
                      {row.severity}
                    </span>
                    <div>
                      <div
                        className="text-sm font-medium mb-1"
                        style={{ color: "#1A1A2E" }}
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
            subtitle="Recomendações ordenadas por impacto e urgência"
          />

          <div
            className="rounded-2xl border overflow-hidden mb-8 bg-white"
            style={{ borderColor: "#E8EAED", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
          >
            <div className="px-8 py-5 border-b flex items-center justify-between" style={{ borderColor: "#E8EAED" }}>
              <h3
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: "#8892A4" }}
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
                <div key={i} className="px-8 py-5 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <PriorityBadge level={item.priority} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4
                          className="text-sm font-semibold"
                          style={{ color: "#1A1A2E" }}
                        >
                          {item.action}
                        </h4>
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ background: "#F0F2F5", color: "#5A6478" }}
                        >
                          {item.area}
                        </span>
                      </div>
                      <div
                        className="text-xs mb-2"
                        style={{ color: "#10B981" }}
                      >
                        🎯 Impacto: {item.impact}
                      </div>
                      <p className="text-sm" style={{ color: "#5A6478", lineHeight: 1.6 }}>
                        {item.detail}
                      </p>
                    </div>
                    <div
                      className="flex-shrink-0 text-xs px-2 py-1 rounded font-semibold"
                      style={{
                        background: item.effort === "Alto" ? "rgba(220,38,38,0.08)" : item.effort === "Médio" ? "rgba(245,158,11,0.08)" : "rgba(16,185,129,0.08)",
                        color: item.effort === "Alto" ? "#991B1B" : item.effort === "Médio" ? "#92400E" : "#065F46",
                      }}
                    >
                      {item.effort}
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
              background: "linear-gradient(135deg, #FF8C00 0%, #E67E00 100%)",
              color: "white",
              boxShadow: "0 4px 20px rgba(255, 140, 0, 0.15)",
            }}
          >
            <h3
              className="text-xl font-bold mb-3"
            >
              Conclusão e Próximos Passos
            </h3>
            <p
              className="text-base mb-4"
              style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}
            >
              O site da Tilecol possui uma base sólida, mas enfrenta desafios técnicos críticos.
              A prioridade imediata deve ser a <strong>otimização de performance</strong> — um LCP de 13,1 segundos
              significa que mais da metade dos usuários abandona o site antes de ver qualquer conteúdo.
            </p>
            <p
              className="text-base mb-6"
              style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}
            >
              Em paralelo, a <strong>implementação de rastreamento de eventos</strong> e a <strong>reformulação dos formulários</strong> são ações
              de baixo esforço e alto impacto que podem ser executadas rapidamente.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { phase: "Fase 1 (Imediato)", items: ["Otimizar imagens para WebP", "Configurar cache do servidor", "Reformular formulário"] },
                { phase: "Fase 2 (30 dias)", items: ["Implementar eventos no GTM", "Instalar Meta Pixel", "Adicionar meta descriptions"] },
                { phase: "Fase 3 (60 dias)", items: ["Reduzir CSS/JS não utilizado", "Criar página de Obrigado", "Corrigir acessibilidade"] },
              ].map((phase) => (
                <div
                  key={phase.phase}
                  className="rounded-xl p-4"
                  style={{ background: "rgba(255,255,255,0.12)" }}
                >
                  <div
                    className="text-xs font-bold mb-2"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {phase.phase}
                  </div>
                  <ul className="space-y-1">
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.8)" }}
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
            style={{ borderColor: "#E8EAED", color: "#8892A4" }}
          >
            Diagnóstico elaborado em 20 de fevereiro de 2026 · Site: tilecol.com.br ·
            Ferramentas: Google PageSpeed Insights, Chrome DevTools, Auditoria Manual
          </div>
        </div>
      </main>
    </div>
  );
}
