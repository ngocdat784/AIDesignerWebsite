"use client";
import {
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleCheck,
  Crown,
  Cpu,
  ExternalLink,
  Globe2,
  Layers3,
  MessageSquare,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  WandSparkles,
  Zap,
} from "lucide-react";

import type { Template } from "@/types/template/template";

type DemoStyle = "modern" | "minimal" | "dark" | "glass";

interface Props {
  template: Template;
}

const styles: {
  id: DemoStyle;
  label: string;
  description: string;
}[] = [
  {
    id: "modern",
    label: "Modern",
    description: "Modern SaaS",
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "Clean & simple",
  },
  {
    id: "dark",
    label: "Dark",
    description: "Dark technology",
  },
  {
    id: "glass",
    label: "Glass",
    description: "Glassmorphism",
  },
];

export default function TemplateDemo({
  template,
}: Props) {
  const [style, setStyle] =
    useState<DemoStyle>("modern");

  const currentStyle =
    getStyleConfig(style);

  const previewImage =
    template.coverImage ||
    template.images?.[0] ||
    template.gallery?.[0] ||
    template.thumbnail;

  const features = template.features ?? [];
  const techStack = template.techStack ?? [];
  const reviewCount =
    template.reviews ?? template.reviewCount ?? 0;

  const hasDiscount =
    template.originalPrice != null &&
    template.discountPrice != null &&
    template.originalPrice >
      template.discountPrice;

  const price =
    template.discountPrice ??
    template.price ??
    0;

  return (
    <main
      className={`min-h-screen overflow-hidden transition-all duration-500 ${currentStyle.page}`}
    >
      {/* =====================================================
          DEMO TOOLBAR
      ===================================================== */}

      <div
        className={`sticky top-0 z-50 border-b backdrop-blur-xl ${currentStyle.toolbar}`}
      >
        <div
          className="flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8"
          style={{
            margin: "0 auto",
          }}
        >
          <div className="min-w-0">
            <p
              className={`text-xs font-medium uppercase tracking-[0.18em] ${currentStyle.muted}`}
            >
              AI SaaS Preview
            </p>

            <h1
              className={`truncate text-sm font-semibold sm:text-base ${currentStyle.text}`}
            >
              {template.title}
            </h1>
          </div>

          <div
            className={`flex shrink-0 items-center gap-1 rounded-xl border p-1 ${currentStyle.selectorWrapper}`}
          >
            {styles.map((item) => {
              const active = style === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setStyle(item.id)
                  }
                  title={item.description}
                  className={`
                    rounded-lg
                    px-3
                    py-2
                    text-xs
                    font-medium
                    transition-all
                    duration-200
                    sm:px-4
                    ${
                      active
                        ? currentStyle.selectorActive
                        : currentStyle.selector
                    }
                  `}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================
          LANDING PAGE
      ===================================================== */}

      <section
        className={`relative overflow-hidden ${currentStyle.background}`}
      >
        {/* Decorative background */}

        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.16), transparent 65%)",
          }}
        />

        <div
          className="pointer-events-none absolute left-1/2 top-[520px] h-[420px] w-[700px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.12), transparent 65%)",
          }}
        />

        <div
          className="relative w-full max-w-7xl px-4 sm:px-6 lg:px-8"
          style={{
            margin: "0 auto",
            paddingTop: "34px",
            paddingBottom: "110px",
          }}
        >
          {/* =================================================
              NAVBAR
          ================================================= */}

          <nav
            className={`flex items-center justify-between rounded-2xl border px-5 py-4 backdrop-blur-xl ${currentStyle.navbar}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${currentStyle.logo}`}
              >
                <Sparkles className="h-5 w-5" />
              </div>

              <span
                className={`text-base font-bold tracking-tight ${currentStyle.text}`}
              >
                NeuralAI
              </span>
            </div>

            <div
              className={`hidden items-center gap-7 text-sm font-medium md:flex ${currentStyle.navLinks}`}
            >
              <a href="#features">Features</a>
              <a href="#workflow">Workflow</a>
              <a href="#pricing">Pricing</a>
              <a href="#reviews">Reviews</a>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className={`hidden rounded-xl px-4 py-2 text-sm font-semibold sm:inline-flex ${currentStyle.navLogin}`}
              >
                Sign in
              </button>

              <button
                type="button"
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ${currentStyle.primaryButton}`}
              >
                Start Free
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </nav>

          {/* =================================================
              HERO
          ================================================= */}

          <div
            className="mx-auto w-full max-w-5xl text-center"
            style={{
              marginTop: "105px",
              marginBottom: "80px",
            }}
          >
            {/* Announcement */}

            <div
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold ${currentStyle.announcement}`}
            >
              <Sparkles className="h-3.5 w-3.5" />

              <span>
                The intelligent workspace for modern teams
              </span>

              <ChevronRight className="h-3.5 w-3.5" />
            </div>

            <h2
              className={`mx-auto max-w-5xl text-5xl font-bold tracking-[-0.045em] sm:text-6xl lg:text-8xl ${currentStyle.heroHeading}`}
              style={{
                marginTop: "30px",
              }}
            >
              Build faster with
              <span
                className={`block ${currentStyle.gradientText}`}
              >
                intelligent AI.
              </span>
            </h2>

            <p
              className={`mx-auto max-w-2xl text-base leading-8 sm:text-lg ${currentStyle.heroDescription}`}
              style={{
                marginTop: "28px",
              }}
            >
              {template.description ||
                "A powerful AI platform that helps modern teams automate workflows, generate content, analyze data, and build better products faster."}
            </p>

            {/* Hero actions */}

            <div
              className="flex flex-col items-center justify-center gap-3 sm:flex-row"
              style={{
                marginTop: "36px",
              }}
            >
              <button
                type="button"
                className={`inline-flex min-w-[170px] items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold ${currentStyle.primaryButton}`}
              >
                <Rocket className="h-4 w-4" />
                Start Building
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                className={`inline-flex min-w-[170px] items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-semibold ${currentStyle.secondaryButton}`}
              >
                <Play className="h-4 w-4" />
                Watch Demo
              </button>
            </div>

            {/* Trust */}

            <div
              className={`flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs ${currentStyle.muted}`}
              style={{
                marginTop: "28px",
              }}
            >
              <span className="inline-flex items-center gap-1.5">
                <CircleCheck className="h-3.5 w-3.5" />
                No credit card required
              </span>

              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Enterprise security
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" />
                Setup in minutes
              </span>
            </div>
          </div>

          {/* =================================================
              AI PRODUCT PREVIEW
          ================================================= */}

          <div
            className={`mx-auto w-full max-w-6xl overflow-hidden rounded-[28px] border ${currentStyle.productPreview}`}
            style={{
              margin: "0 auto",
            }}
          >
            {/* Window header */}

            <div
              className={`flex items-center justify-between border-b px-5 py-4 ${currentStyle.previewHeader}`}
            >
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              <div
                className={`hidden h-7 max-w-md flex-1 rounded-lg sm:block ${currentStyle.address}`}
                style={{
                  marginLeft: "50px",
                  marginRight: "50px",
                }}
              />

              <div
                className={`h-8 w-8 rounded-lg ${currentStyle.previewAvatar}`}
              />
            </div>

            {/* Application */}

            <div className="grid min-h-[570px] lg:grid-cols-[220px_1fr]">
              {/* Sidebar */}

              <aside
                className={`hidden border-r p-5 lg:block ${currentStyle.sidebar}`}
              >
                <div
                  className={`flex items-center gap-2 text-sm font-bold ${currentStyle.text}`}
                >
                  <Sparkles className="h-4 w-4" />
                  NeuralAI
                </div>

                <div
                  className="space-y-2"
                  style={{
                    marginTop: "28px",
                  }}
                >
                  {[
                    "Overview",
                    "AI Assistant",
                    "Automation",
                    "Analytics",
                    "Knowledge",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium ${
                        index === 0
                          ? currentStyle.sidebarActive
                          : currentStyle.sidebarItem
                      }`}
                    >
                      <Layers3 className="h-3.5 w-3.5" />
                      {item}
                    </div>
                  ))}
                </div>

                <div
                  className={`rounded-2xl border p-4 ${currentStyle.sidebarCard}`}
                  style={{
                    marginTop: "170px",
                  }}
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${currentStyle.logo}`}
                  >
                    <Crown className="h-4 w-4" />
                  </div>

                  <p
                    className={`text-xs font-semibold ${currentStyle.text}`}
                    style={{
                      marginTop: "12px",
                    }}
                  >
                    Upgrade workspace
                  </p>

                  <p
                    className={`text-[11px] leading-5 ${currentStyle.muted}`}
                    style={{
                      marginTop: "6px",
                    }}
                  >
                    Unlock advanced AI agents.
                  </p>
                </div>
              </aside>

              {/* Dashboard */}

              <div
                className={`p-5 sm:p-7 ${currentStyle.dashboard}`}
              >
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                  <div>
                    <p
                      className={`text-xs font-medium uppercase tracking-wider ${currentStyle.muted}`}
                    >
                      AI Workspace
                    </p>

                    <h3
                      className={`text-2xl font-bold ${currentStyle.text}`}
                      style={{
                        marginTop: "6px",
                      }}
                    >
                      Good morning, Alex.
                    </h3>
                  </div>

                  <button
                    type="button"
                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold ${currentStyle.primaryButton}`}
                  >
                    <WandSparkles className="h-3.5 w-3.5" />
                    New AI Task
                  </button>
                </div>

                {/* Metrics */}

                <div
                  className="grid gap-4 sm:grid-cols-3"
                  style={{
                    marginTop: "26px",
                  }}
                >
                  <DashboardMetric
                    label="AI Tasks"
                    value="1,284"
                    change="+24.8%"
                    icon={<Cpu className="h-4 w-4" />}
                    style={currentStyle}
                  />

                  <DashboardMetric
                    label="Automation"
                    value="92.4%"
                    change="+8.2%"
                    icon={<Zap className="h-4 w-4" />}
                    style={currentStyle}
                  />

                  <DashboardMetric
                    label="Time Saved"
                    value="184h"
                    change="+32.5%"
                    icon={<ClockIcon />}
                    style={currentStyle}
                  />
                </div>

                {/* Main AI card */}

                <div
                  className={`grid gap-5 lg:grid-cols-[1.4fr_0.8fr]`}
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <div
                    className={`rounded-2xl border p-5 ${currentStyle.dashboardCard}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`text-sm font-semibold ${currentStyle.text}`}
                        >
                          AI Performance
                        </p>

                        <p
                          className={`text-xs ${currentStyle.muted}`}
                          style={{
                            marginTop: "4px",
                          }}
                        >
                          Productivity overview
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${currentStyle.successBadge}`}
                      >
                        +18.4%
                      </span>
                    </div>

                    <div
                      className="flex h-52 items-end gap-2"
                      style={{
                        marginTop: "24px",
                      }}
                    >
                      {[38, 52, 46, 68, 61, 76, 71, 88, 79, 94, 84, 100].map(
                        (height, index) => (
                          <div
                            key={index}
                            className={`flex-1 rounded-t-lg ${currentStyle.chartBar}`}
                            style={{
                              height: `${height}%`,
                            }}
                          />
                        ),
                      )}
                    </div>

                    <div
                      className={`grid grid-cols-4 text-[10px] ${currentStyle.muted}`}
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      <span>Mon</span>
                      <span className="text-center">Wed</span>
                      <span className="text-center">Fri</span>
                      <span className="text-right">Sun</span>
                    </div>
                  </div>

                  {/* AI Assistant */}

                  <div
                    className={`rounded-2xl border p-5 ${currentStyle.aiCard}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${currentStyle.logo}`}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </div>

                      <div>
                        <p
                          className={`text-sm font-semibold ${currentStyle.text}`}
                        >
                          AI Copilot
                        </p>

                        <p
                          className={`text-[10px] ${currentStyle.muted}`}
                        >
                          Online
                        </p>
                      </div>
                    </div>

                    <div
                      className={`rounded-xl p-3 text-xs leading-5 ${currentStyle.chatBubble}`}
                      style={{
                        marginTop: "22px",
                      }}
                    >
                      I analyzed your workspace and found 4 opportunities to
                      automate repetitive tasks.
                    </div>

                    <div
                      className={`rounded-xl p-3 text-xs leading-5 ${currentStyle.chatBubbleAlt}`}
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      Want me to generate an automation workflow?
                    </div>

                    <button
                      type="button"
                      className={`w-full rounded-xl px-4 py-2.5 text-xs font-semibold ${currentStyle.aiButton}`}
                      style={{
                        marginTop: "18px",
                      }}
                    >
                      Generate workflow
                    </button>
                  </div>
                </div>

                {/* Preview image */}

                {previewImage && (
                  <div
                    className="relative overflow-hidden rounded-2xl"
                    style={{
                      marginTop: "20px",
                      height: "130px",
                    }}
                  >
                    <img
                      src={previewImage}
                      alt={`${template.title} preview`}
                      className="h-full w-full object-cover object-top opacity-70"
                    />

                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                      }}
                    />

                    <div className="absolute bottom-4 left-4">
                      <p className="text-xs font-semibold text-white">
                        AI SaaS Workspace
                      </p>

                      <p
                        className="text-[10px] text-white/70"
                        style={{
                          marginTop: "3px",
                        }}
                      >
                        Intelligent automation platform
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =================================================
              TRUSTED BY
          ================================================= */}

          <div
            className="mx-auto max-w-5xl text-center"
            style={{
              marginTop: "90px",
              marginBottom: "30px",
            }}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-[0.18em] ${currentStyle.muted}`}
            >
              Trusted by forward-thinking teams
            </p>

            <div
              className={`flex flex-wrap items-center justify-center gap-x-10 gap-y-5 text-sm font-bold ${currentStyle.trusted}`}
              style={{
                marginTop: "30px",
              }}
            >
              <span>NOVA</span>
              <span>VERTEX</span>
              <span>QUANTUM</span>
              <span>ORBIT</span>
              <span>MONO</span>
              <span>ARC</span>
            </div>
          </div>

          {/* =================================================
              FEATURES
          ================================================= */}

          <section
            id="features"
            style={{
              marginTop: "130px",
            }}
          >
            <SectionHeader
              eyebrow="Powerful AI"
              title="Everything your AI team needs"
              description="A complete AI SaaS experience designed to turn complex workflows into simple, intelligent actions."
              style={currentStyle}
            />

            <div
              className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3"
              style={{
                marginTop: "52px",
              }}
            >
              {[
                {
                  icon: <WandSparkles className="h-5 w-5" />,
                  title: "AI Copilot",
                  description:
                    "Work alongside an intelligent assistant that understands your context and helps you make better decisions.",
                },
                {
                  icon: <Zap className="h-5 w-5" />,
                  title: "Smart Automation",
                  description:
                    "Automate repetitive workflows with AI-powered agents that operate continuously in the background.",
                },
                {
                  icon: <Cpu className="h-5 w-5" />,
                  title: "AI Agents",
                  description:
                    "Create autonomous agents capable of analyzing information and executing complex multi-step tasks.",
                },
                {
                  icon: <ShieldCheck className="h-5 w-5" />,
                  title: "Enterprise Security",
                  description:
                    "Protect sensitive information with secure infrastructure, permissions, and enterprise-ready controls.",
                },
                {
                  icon: <Globe2 className="h-5 w-5" />,
                  title: "Global Infrastructure",
                  description:
                    "Deliver fast AI experiences to customers around the world with reliable cloud infrastructure.",
                },
                {
                  icon: <Layers3 className="h-5 w-5" />,
                  title: "One Unified Platform",
                  description:
                    "Bring your AI workflows, knowledge, analytics, and automation together in one workspace.",
                },
              ].map((feature) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  style={currentStyle}
                />
              ))}
            </div>
          </section>

          {/* =================================================
              WORKFLOW
          ================================================= */}

          <section
            id="workflow"
            style={{
              marginTop: "140px",
            }}
          >
            <div className="mx-auto max-w-3xl text-center">
              <SectionHeader
                eyebrow="Simple workflow"
                title="From idea to execution in minutes"
                description="Build intelligent workflows without complicated setup."
                style={currentStyle}
              />
            </div>

            <div
              className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3"
              style={{
                marginTop: "52px",
              }}
            >
              {[
                {
                  number: "01",
                  title: "Connect",
                  description:
                    "Connect your data, tools, APIs, and existing workflows.",
                },
                {
                  number: "02",
                  title: "Describe",
                  description:
                    "Tell the AI what you want to accomplish using natural language.",
                },
                {
                  number: "03",
                  title: "Automate",
                  description:
                    "Let intelligent agents execute and optimize the workflow automatically.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className={`relative rounded-2xl border p-7 text-center ${currentStyle.card}`}
                >
                  <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold ${currentStyle.icon}`}
                  >
                    {step.number}
                  </div>

                  <h3
                    className={`text-lg font-semibold ${currentStyle.text}`}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`text-sm leading-7 ${currentStyle.description}`}
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* =================================================
              TECHNOLOGY
          ================================================= */}

          {techStack.length > 0 && (
            <section
              style={{
                marginTop: "130px",
              }}
            >
              <SectionHeader
                eyebrow="Technology"
                title="Built for modern AI products"
                description="Powered by technologies trusted by today's best development teams."
                style={currentStyle}
              />

              <div
                className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3"
                style={{
                  marginTop: "42px",
                }}
              >
                {techStack.map((tech) => (
                  <div
                    key={tech}
                    className={`rounded-xl border px-5 py-3 text-sm font-medium ${currentStyle.tech}`}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* =================================================
              PRICING
          ================================================= */}

          <section
            id="pricing"
            style={{
              marginTop: "140px",
            }}
          >
            <SectionHeader
              eyebrow="Simple pricing"
              title="Start free. Scale when ready."
              description="Everything you need to launch your AI-powered product."
              style={currentStyle}
            />

            <div
              className="mx-auto max-w-md"
              style={{
                marginTop: "52px",
              }}
            >
              <div
                className={`rounded-3xl border p-8 text-center ${currentStyle.pricing}`}
              >
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${currentStyle.logo}`}
                >
                  <Sparkles className="h-5 w-5" />
                </div>

                <p
                  className={`text-sm font-semibold ${currentStyle.text}`}
                  style={{
                    marginTop: "18px",
                  }}
                >
                  AI Pro
                </p>

                <div
                  className={`flex items-end justify-center gap-2 ${currentStyle.text}`}
                  style={{
                    marginTop: "14px",
                  }}
                >
                  <span className="text-5xl font-bold">
                    {price === 0
                      ? "Free"
                      : formatPrice(price)}
                  </span>

                  {price !== 0 && (
                    <span
                      className={`pb-1 text-sm ${currentStyle.muted}`}
                    >
                      / project
                    </span>
                  )}
                </div>

                {hasDiscount && (
                  <p
                    className={`text-sm line-through ${currentStyle.muted}`}
                    style={{
                      marginTop: "5px",
                    }}
                  >
                    {formatPrice(
                      template.originalPrice!,
                    )}
                  </p>
                )}

                <p
                  className={`text-sm leading-7 ${currentStyle.description}`}
                  style={{
                    marginTop: "16px",
                  }}
                >
                  Everything included to build and launch a
                  modern AI SaaS product.
                </p>

                <div
                  className="space-y-3 text-left"
                  style={{
                    marginTop: "28px",
                  }}
                >
                  {[
                    "Unlimited AI workflows",
                    "AI Copilot",
                    "Advanced automation",
                    "Analytics dashboard",
                    "Enterprise security",
                  ].map((item) => (
                    <div
                      key={item}
                      className={`flex items-center gap-3 text-sm ${currentStyle.description}`}
                    >
                      <Check
                        className={`h-4 w-4 shrink-0 ${currentStyle.accent}`}
                      />
                      {item}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className={`w-full rounded-xl px-6 py-3.5 text-sm font-semibold ${currentStyle.primaryButton}`}
                  style={{
                    marginTop: "30px",
                  }}
                >
                  Start Building
                </button>
              </div>
            </div>
          </section>

          {/* =================================================
              REVIEWS
          ================================================= */}

          <section
            id="reviews"
            style={{
              marginTop: "140px",
            }}
          >
            <SectionHeader
              eyebrow="Loved by teams"
              title="Built to make work feel effortless"
              description="See why modern teams choose AI-powered workflows."
              style={currentStyle}
            />

            <div
              className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3"
              style={{
                marginTop: "52px",
              }}
            >
              {[
                {
                  quote:
                    "NeuralAI completely changed how our team handles repetitive work. We save hours every week.",
                  name: "Sarah Chen",
                  role: "Product Lead",
                },
                {
                  quote:
                    "The AI workflows are incredibly intuitive. We went from idea to production in a single afternoon.",
                  name: "Marcus Lee",
                  role: "Founder",
                },
                {
                  quote:
                    "A beautiful combination of automation and intelligence. It feels like having an extra team member.",
                  name: "Emma Wilson",
                  role: "Operations",
                },
              ].map((review) => (
                <div
                  key={review.name}
                  className={`rounded-2xl border p-7 ${currentStyle.card}`}
                >
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 fill-current ${currentStyle.star}`}
                      />
                    ))}
                  </div>

                  <p
                    className={`text-sm leading-7 ${currentStyle.description}`}
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    “{review.quote}”
                  </p>

                  <div
                    className="flex items-center gap-3"
                    style={{
                      marginTop: "24px",
                    }}
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${currentStyle.logo}`}
                    >
                      {review.name
                        .slice(0, 1)
                        .toUpperCase()}
                    </div>

                    <div>
                      <p
                        className={`text-sm font-semibold ${currentStyle.text}`}
                      >
                        {review.name}
                      </p>

                      <p
                        className={`text-xs ${currentStyle.muted}`}
                        style={{
                          marginTop: "2px",
                        }}
                      >
                        {review.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {reviewCount > 0 && (
              <p
                className={`text-center text-xs ${currentStyle.muted}`}
                style={{
                  marginTop: "24px",
                }}
              >
                Rated {template.rating?.toFixed(1) ?? "5.0"} / 5
                from {formatNumber(reviewCount)} reviews
              </p>
            )}
          </section>

          {/* =================================================
              FINAL CTA
          ================================================= */}

          <section
            className={`relative overflow-hidden rounded-[32px] border text-center ${currentStyle.cta}`}
            style={{
              marginTop: "150px",
              padding: "72px 32px",
            }}
          >
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${currentStyle.logo}`}
            >
              <Rocket className="h-6 w-6" />
            </div>

            <h3
              className={`mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl ${currentStyle.heroHeading}`}
              style={{
                marginTop: "24px",
              }}
            >
              Build the future with AI.
            </h3>

            <p
              className={`mx-auto max-w-xl text-base leading-7 ${currentStyle.description}`}
              style={{
                marginTop: "18px",
              }}
            >
              Turn your ideas into intelligent products with
              {` ${template.title || "this AI SaaS platform"}`}.
            </p>

            <div
              className="flex flex-col justify-center gap-3 sm:flex-row"
              style={{
                marginTop: "30px",
              }}
            >
              <button
                type="button"
                className={`inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold ${currentStyle.primaryButton}`}
              >
                Start for free
                <ArrowRight className="h-4 w-4" />
              </button>

              {template.demoUrl && (
                <a
                  href={template.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border px-7 py-3.5 text-sm font-semibold ${currentStyle.secondaryButton}`}
                >
                  View live demo
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </section>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer
            className={`text-center ${currentStyle.footer}`}
            style={{
              marginTop: "60px",
            }}
          >
            <div
              className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                margin: "0 auto",
              }}
            >
              <Sparkles className="h-5 w-5" />
            </div>

            <p
              className={`text-sm font-semibold ${currentStyle.text}`}
              style={{
                marginTop: "12px",
              }}
            >
              NeuralAI
            </p>

            <p
              className={`text-xs ${currentStyle.muted}`}
              style={{
                marginTop: "6px",
              }}
            >
              Intelligent software for modern teams.
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  eyebrow,
  title,
  description,
  style,
}: {
  eyebrow: string;
  title: string;
  description: string;
  style: ReturnType<typeof getStyleConfig>;
}) {
  return (
    <div
      className="mx-auto max-w-2xl text-center"
      style={{
        margin: "0 auto",
      }}
    >
      <p
        className={`text-sm font-semibold uppercase tracking-[0.18em] ${style.accent}`}
      >
        {eyebrow}
      </p>

      <h3
        className={`text-3xl font-bold tracking-tight sm:text-4xl ${style.heading}`}
        style={{
          marginTop: "12px",
        }}
      >
        {title}
      </h3>

      <p
        className={`text-sm leading-7 sm:text-base ${style.description}`}
        style={{
          marginTop: "14px",
        }}
      >
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({
  icon,
  title,
  description,
  style,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  style: ReturnType<typeof getStyleConfig>;
}) {
  return (
    <div
      className={`rounded-2xl border p-7 text-center transition-all duration-300 ${style.card}`}
    >
      <div
        className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl ${style.icon}`}
      >
        {icon}
      </div>

      <h4
        className={`text-lg font-semibold ${style.text}`}
        style={{
          marginTop: "20px",
        }}
      >
        {title}
      </h4>

      <p
        className={`text-sm leading-7 ${style.description}`}
        style={{
          marginTop: "10px",
        }}
      >
        {description}
      </p>

      <button
        type="button"
        className={`inline-flex items-center gap-1 text-xs font-semibold ${style.accent}`}
        style={{
          marginTop: "18px",
        }}
      >
        Learn more
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* =========================================================
   DASHBOARD METRIC
========================================================= */

function DashboardMetric({
  label,
  value,
  change,
  icon,
  style,
}: {
  label: string;
  value: string;
  change: string;
  icon: ReactNode;
  style: ReturnType<typeof getStyleConfig>;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${style.dashboardMetric}`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${style.metricIcon}`}
        >
          {icon}
        </span>

        <span
          className={`text-[10px] font-semibold ${style.successText}`}
        >
          {change}
        </span>
      </div>

      <p
        className={`text-xs ${style.muted}`}
        style={{
          marginTop: "14px",
        }}
      >
        {label}
      </p>

      <p
        className={`text-xl font-bold ${style.text}`}
        style={{
          marginTop: "4px",
        }}
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   CLOCK ICON
========================================================= */

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatPrice(value: number) {
  if (value === 0) {
    return "Free";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

/* =========================================================
   STYLE CONFIGURATION
========================================================= */

function getStyleConfig(style: DemoStyle) {
  switch (style) {
    case "minimal":
      return {
        page: "bg-white text-gray-900",

        toolbar:
          "border-gray-200 bg-white/90",

        navbar:
          "border-gray-200 bg-white/80",

        selectorWrapper:
          "border-gray-200 bg-white",
        selector:
  "text-gray-600 hover:bg-gray-100",

selectorActive:
  "bg-gray-900 text-white",
        background:
          "bg-white",

        text:
          "text-gray-900",

        heading:
          "text-gray-950",

        heroHeading:
          "text-gray-950",

        heroDescription:
          "text-gray-500",

        muted:
          "text-gray-500",

        description:
          "text-gray-600",

        accent:
          "text-gray-900",

        gradientText:
          "text-gray-500",

        logo:
          "bg-gray-900 text-white",

        navLinks:
          "text-gray-500",

        navLogin:
          "text-gray-600 hover:bg-gray-100",

        announcement:
          "border-gray-200 bg-gray-50 text-gray-700",

        trusted:
          "text-gray-400",

        productPreview:
          "border-gray-200 bg-white shadow-sm",

        previewHeader:
          "border-gray-200 bg-gray-50",

        previewAvatar:
          "bg-gray-200",

        address:
          "bg-gray-200",

        sidebar:
          "border-gray-200 bg-gray-50",

        sidebarActive:
          "bg-gray-900 text-white",

        sidebarItem:
          "text-gray-500 hover:bg-gray-100",

        sidebarCard:
          "border-gray-200 bg-white",

        dashboard:
          "bg-white",

        dashboardCard:
          "border-gray-200 bg-white",

        aiCard:
          "border-gray-200 bg-gray-50",

        dashboardMetric:
          "border-gray-200 bg-white",

        metricIcon:
          "bg-gray-100 text-gray-700",

        chartBar:
          "bg-gray-900",

        chatBubble:
          "bg-white border border-gray-200 text-gray-600",

        chatBubbleAlt:
          "bg-gray-900 text-white",

        aiButton:
          "bg-gray-900 text-white",

        successBadge:
          "bg-gray-100 text-gray-700",

        successText:
          "text-gray-600",

        icon:
          "bg-gray-900 text-white",

        tech:
          "border-gray-200 bg-gray-50 text-gray-700",

        card:
          "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm",

        pricing:
          "border-gray-200 bg-white shadow-sm",

        cta:
          "border-gray-200 bg-gray-50",

        secondaryButton:
          "border-gray-300 bg-white text-gray-900 hover:bg-gray-50",

        primaryButton:
          "bg-gray-900 text-white hover:bg-gray-800",

        footer:
          "text-gray-500",

        star:
          "text-gray-900",
      };

    case "dark":
      return {
        page:
          "bg-[#09090b] text-white",

        toolbar:
          "border-white/10 bg-[#09090b]/90",

        navbar:
          "border-white/10 bg-white/[0.03]",

        selectorWrapper:
          "border-white/10 bg-white/[0.03]",

        background:
          "bg-[#09090b]",

        text:
          "text-white",

        heading:
          "text-white",

        heroHeading:
          "text-white",

        heroDescription:
          "text-zinc-400",

        muted:
          "text-zinc-500",

        description:
          "text-zinc-400",

        accent:
          "text-indigo-400",

        gradientText:
          "bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent",

        logo:
          "bg-indigo-500 text-white",

        navLinks:
          "text-zinc-400",

        navLogin:
          "text-zinc-400 hover:bg-white/5",

        announcement:
          "border-indigo-400/20 bg-indigo-400/10 text-indigo-300",

        trusted:
          "text-zinc-600",

        productPreview:
          "border-white/10 bg-zinc-950 shadow-2xl shadow-indigo-500/10",

        previewHeader:
          "border-white/10 bg-white/[0.03]",

        previewAvatar:
          "bg-white/10",

        address:
          "bg-white/5",

        sidebar:
          "border-white/10 bg-white/[0.02]",

        sidebarActive:
          "bg-indigo-500/15 text-indigo-300",

        sidebarItem:
          "text-zinc-500 hover:bg-white/5",

        sidebarCard:
          "border-white/10 bg-white/[0.03]",

        dashboard:
          "bg-zinc-950",

        dashboardCard:
          "border-white/10 bg-white/[0.02]",

        aiCard:
          "border-white/10 bg-indigo-500/[0.04]",

        dashboardMetric:
          "border-white/10 bg-white/[0.03]",

        metricIcon:
          "bg-indigo-500/10 text-indigo-300",

        chartBar:
          "bg-indigo-500",

        chatBubble:
          "bg-white/[0.04] text-zinc-400",

        chatBubbleAlt:
          "bg-indigo-500/10 text-indigo-300",

        aiButton:
          "bg-indigo-500 text-white",

        successBadge:
          "bg-emerald-500/10 text-emerald-400",

        successText:
          "text-emerald-400",

        icon:
          "bg-indigo-500 text-white",

        tech:
          "border-white/10 bg-white/[0.03] text-zinc-300",

        card:
          "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]",

        pricing:
          "border-indigo-500/30 bg-indigo-500/[0.05]",

        cta:
          "border-indigo-500/20 bg-indigo-500/10",

        secondaryButton:
          "border-white/10 bg-white/5 text-white hover:bg-white/10",

        primaryButton:
          "bg-indigo-500 text-white hover:bg-indigo-400",

        footer:
          "text-zinc-500",

        star:
          "text-yellow-400",
      };

    case "glass":
      return {
        page:
          "bg-slate-950 text-white",

        toolbar:
          "border-white/10 bg-white/10",

        navbar:
          "border-white/15 bg-white/10 backdrop-blur-xl",

        selectorWrapper:
          "border-white/10 bg-white/10",

        background:
          "bg-slate-950",

        text:
          "text-white",

          selector:
  "text-white/60 hover:bg-white/10",

selectorActive:
  "bg-white/20 text-white backdrop-blur-xl",
        heading:
          "text-white",

        heroHeading:
          "text-white",

        heroDescription:
          "text-white/60",

        muted:
          "text-white/50",

        description:
          "text-white/65",

        accent:
          "text-cyan-300",

        gradientText:
          "bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent",

        logo:
          "bg-white/10 text-cyan-300 backdrop-blur-xl",

        navLinks:
          "text-white/60",

        navLogin:
          "text-white/60 hover:bg-white/10",

        announcement:
          "border-white/20 bg-white/10 text-white/80 backdrop-blur-xl",

        trusted:
          "text-white/30",

        productPreview:
          "border-white/20 bg-white/10 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl",

        previewHeader:
          "border-white/10 bg-white/5",

        previewAvatar:
          "bg-white/10",

        address:
          "bg-white/10",

        sidebar:
          "border-white/10 bg-white/5",

        sidebarActive:
          "bg-white/10 text-cyan-300",

        sidebarItem:
          "text-white/50 hover:bg-white/10",

        sidebarCard:
          "border-white/10 bg-white/5",

        dashboard:
          "bg-white/[0.02]",

        dashboardCard:
          "border-white/10 bg-white/5 backdrop-blur-xl",

        aiCard:
          "border-white/10 bg-cyan-500/[0.05]",

        dashboardMetric:
          "border-white/10 bg-white/5",

        metricIcon:
          "bg-white/10 text-cyan-300",

        chartBar:
          "bg-cyan-400",

        chatBubble:
          "bg-white/5 text-white/60",

        chatBubbleAlt:
          "bg-cyan-400/10 text-cyan-200",

        aiButton:
          "bg-white text-slate-950",

        successBadge:
          "bg-emerald-400/10 text-emerald-300",

        successText:
          "text-emerald-300",

        icon:
          "bg-white/10 text-cyan-300",

        tech:
          "border-white/20 bg-white/10 text-white/80 backdrop-blur-xl",

        card:
          "border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10",

        pricing:
          "border-white/20 bg-white/10 backdrop-blur-xl",

        cta:
          "border-white/10 bg-white/10 backdrop-blur-xl",

        secondaryButton:
          "border-white/20 bg-white/10 text-white hover:bg-white/20",

        primaryButton:
          "bg-white text-slate-950 hover:bg-white/90",

        footer:
          "text-white/50",

        star:
          "text-yellow-300",
      };

    case "modern":
    default:
      return {
        page:
          "bg-slate-50 text-slate-900",

        toolbar:
          "border-slate-200 bg-white/90",

        navbar:
          "border-slate-200 bg-white/80 shadow-sm",

        selectorWrapper:
          "border-slate-200 bg-white",

        background:
          "bg-slate-50",

        text:
          "text-slate-900",

          selector:
  "text-slate-600 hover:bg-slate-100",

selectorActive:
  "bg-indigo-600 text-white",
        heading:
          "text-slate-950",

        heroHeading:
          "text-slate-950",

        heroDescription:
          "text-slate-600",

        muted:
          "text-slate-500",

        description:
          "text-slate-600",

        accent:
          "text-indigo-600",

        gradientText:
          "bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent",

        logo:
          "bg-indigo-600 text-white",

        navLinks:
          "text-slate-500",

        navLogin:
          "text-slate-600 hover:bg-slate-100",

        announcement:
          "border-indigo-200 bg-indigo-50 text-indigo-700",

        trusted:
          "text-slate-400",

        productPreview:
          "border-slate-200 bg-white shadow-2xl shadow-slate-900/10",

        previewHeader:
          "border-slate-200 bg-slate-50",

        previewAvatar:
          "bg-slate-200",

        address:
          "bg-slate-200",

        sidebar:
          "border-slate-200 bg-slate-50",

        sidebarActive:
          "bg-indigo-50 text-indigo-700",

        sidebarItem:
          "text-slate-500 hover:bg-slate-100",

        sidebarCard:
          "border-slate-200 bg-white",

        dashboard:
          "bg-white",

        dashboardCard:
          "border-slate-200 bg-white",

        aiCard:
          "border-indigo-100 bg-indigo-50/40",

        dashboardMetric:
          "border-slate-200 bg-white",

        metricIcon:
          "bg-indigo-50 text-indigo-600",

        chartBar:
          "bg-indigo-500",

        chatBubble:
          "bg-white border border-slate-200 text-slate-600",

        chatBubbleAlt:
          "bg-indigo-50 text-indigo-700",

        aiButton:
          "bg-indigo-600 text-white",

        successBadge:
          "bg-emerald-50 text-emerald-600",

        successText:
          "text-emerald-600",

        icon:
          "bg-indigo-600 text-white",

        tech:
          "border-slate-200 bg-white text-slate-700 shadow-sm",

        card:
          "border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg",

        pricing:
          "border-indigo-200 bg-white shadow-xl shadow-indigo-500/10",

        cta:
          "border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50",

        secondaryButton:
          "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",

        primaryButton:
          "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500",

        footer:
          "text-slate-500",

        star:
          "text-yellow-500",
      };
  }
}