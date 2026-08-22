"use client";

import { useMemo, useState } from "react";
import {
  Check,
  ChevronRight,
  File,
  FileCode2,
  Folder,
  FolderOpen,
  Layers3,
  Rocket,
  Settings2,
} from "lucide-react";

import type { TemplateDetailProps } from "@/components/sections/template-detail/types";

type DemoStyle = "modern" | "minimal" | "dark" | "glass";

interface Props extends TemplateDetailProps {}

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

export default function TemplateDemo({ template }: Props) {
  const [style, setStyle] = useState<DemoStyle>("modern");

  const currentStyle = getStyleConfig(style);

  const previewImage =
    template.coverImage ||
    template.images?.[0] ||
    template.gallery?.[0] ||
    template.thumbnail;

  const features = template.features ?? [];
  const techStack = template.techStack ?? [];
  const includedFiles = template.includedFiles ?? [];
  const installationSteps = template.installationSteps ?? [];
  const requirements = template.requirements ?? [];

  const fileGroups = useMemo(() => {
    const folders = includedFiles.filter(
      (file) =>
        file.type?.toLowerCase() === "folder" ||
        file.type?.toLowerCase() === "directory",
    );

    const files = includedFiles.filter(
      (file) =>
        file.type?.toLowerCase() !== "folder" &&
        file.type?.toLowerCase() !== "directory",
    );

    return {
      folders,
      files,
    };
  }, [includedFiles]);

  return (
    <main
      className={`min-h-screen transition-all duration-500 ${currentStyle.page}`}
    >
      {/* =====================================================
          DEMO TOOLBAR
      ===================================================== */}

      <div
        className={`sticky top-0 z-50 border-b backdrop-blur-xl ${currentStyle.toolbar}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <p
              className={`text-xs font-medium uppercase tracking-wider ${currentStyle.muted}`}
            >
              Live Demo
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
                  onClick={() => setStyle(item.id)}
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
          DEMO CONTENT
      ===================================================== */}

      <section className="relative overflow-hidden">
        <div
          className={`pointer-events-none absolute inset-0 ${currentStyle.background}`}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          {/* =================================================
              HERO
          ================================================= */}

          <div className="mx-auto max-w-4xl text-center">
            <div
              className={`mb-6 inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium ${currentStyle.badge}`}
            >
              {template.category}
            </div>

            <h2
              className={`text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl ${currentStyle.heading}`}
            >
              {template.title}
            </h2>

            <p
              className={`mx-auto mt-6 max-w-2xl text-base leading-8 sm:text-lg ${currentStyle.description}`}
            >
              {template.description}
            </p>

            {template.tags?.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-3 py-1 text-xs ${currentStyle.tag}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${currentStyle.primaryButton}`}
              >
                Get Started
              </button>

              <button
                type="button"
                className={`rounded-xl border px-6 py-3 text-sm font-semibold transition-all duration-300 ${currentStyle.secondaryButton}`}
              >
                View Template
              </button>
            </div>
          </div>

          {/* =================================================
              TEMPLATE PREVIEW
          ================================================= */}

          <div
            className={`mx-auto mt-16 max-w-6xl overflow-hidden rounded-3xl border ${currentStyle.preview}`}
          >
            <div
              className={`flex items-center gap-2 border-b px-5 py-4 ${currentStyle.previewHeader}`}
            >
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />

              <div
                className={`ml-4 hidden h-6 flex-1 rounded-lg sm:block ${currentStyle.address}`}
              />
            </div>

            <div className="relative overflow-hidden">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt={`${template.title} preview`}
                  className="h-auto max-h-[700px] w-full object-cover object-top"
                />
              ) : (
                <div
                  className={`flex min-h-[400px] items-center justify-center ${currentStyle.visual}`}
                >
                  <div className="text-center">
                    <div
                      className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-bold ${currentStyle.icon}`}
                    >
                      {template.title.slice(0, 2).toUpperCase()}
                    </div>

                    <p
                      className={`mt-4 text-sm font-medium ${currentStyle.text}`}
                    >
                      {template.title}
                    </p>

                    <p className={`mt-1 text-xs ${currentStyle.muted}`}>
                      Template Preview
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* =================================================
              TEMPLATE INFORMATION
          ================================================= */}

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              label="Author"
              value={template.author?.name ?? "Unknown Author"}
              style={currentStyle}
            />

            <InfoCard
              label="Version"
              value={template.version ?? "Latest"}
              style={currentStyle}
            />

            <InfoCard
              label="Rating"
              value={
                template.rating
                  ? `${template.rating.toFixed(1)} / 5`
                  : "No rating"
              }
              style={currentStyle}
            />

            <InfoCard
              label="Downloads"
              value={formatNumber(template.downloads)}
              style={currentStyle}
            />
          </div>

          {/* =================================================
              FEATURES
          ================================================= */}

          {features.length > 0 && (
            <section className="mt-28">
              <SectionHeader
                eyebrow="Features"
                title="What this template includes"
                description={`Everything included with ${template.title}.`}
                style={currentStyle}
              />

              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <div
                    key={`${feature}-${index}`}
                    className={`group rounded-2xl border p-6 transition-all duration-300 ${currentStyle.card}`}
                  >
                    <div
                      className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl font-semibold ${currentStyle.icon}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <h4
                      className={`text-lg font-semibold ${currentStyle.text}`}
                    >
                      {feature}
                    </h4>

                    <p
                      className={`mt-3 text-sm leading-7 ${currentStyle.description}`}
                    >
                      Included as part of the {template.title} template.
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* =================================================
              TECHNOLOGY
          ================================================= */}

          {techStack.length > 0 && (
            <section className="mt-28">
              <SectionHeader
                eyebrow="Technology"
                title="Built with modern technologies"
                description={`Technology stack used by ${template.title}.`}
                style={currentStyle}
              />

              <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
                {techStack.map((tech) => (
                  <div
                    key={tech}
                    className={`rounded-xl border px-5 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${currentStyle.tech}`}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* =================================================
              INCLUDED FILES
          ================================================= */}

          {includedFiles.length > 0 && (
            <section className="mt-28">
              <SectionHeader
                eyebrow="Included Files"
                title="Project structure"
                description={`Everything included in the ${template.title} package.`}
                style={currentStyle}
              />

              <div className="mx-auto mt-10 max-w-5xl">
                <div
                  className={`overflow-hidden rounded-3xl border ${currentStyle.filePanel}`}
                >
                  {/* Explorer Header */}

                  <div
                    className={`flex items-center justify-between border-b px-5 py-4 ${currentStyle.fileHeader}`}
                  >
                    <div className="flex items-center gap-3">
                      <FolderOpen
                        className={`h-5 w-5 ${currentStyle.accent}`}
                      />

                      <div>
                        <p
                          className={`text-sm font-semibold ${currentStyle.text}`}
                        >
                          {template.title}
                        </p>

                        <p
                          className={`mt-0.5 text-xs ${currentStyle.muted}`}
                        >
                          Project files
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${currentStyle.fileCount}`}
                    >
                      {includedFiles.length} items
                    </span>
                  </div>

                  <div className="p-3 sm:p-5">
                    {/* Folders */}

                    {fileGroups.folders.length > 0 && (
                      <div>
                        <p
                          className={`mb-3 px-2 text-xs font-semibold uppercase tracking-wider ${currentStyle.muted}`}
                        >
                          Folders
                        </p>

                        <div className="grid gap-2 sm:grid-cols-2">
                          {fileGroups.folders.map((folder, index) => (
                            <FileExplorerItem
                              key={`${folder.name}-${index}`}
                              name={folder.name}
                              type={folder.type}
                              isFolder
                              style={currentStyle}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Files */}

                    {fileGroups.files.length > 0 && (
                      <div
                        className={
                          fileGroups.folders.length > 0 ? "mt-7" : ""
                        }
                      >
                        <p
                          className={`mb-3 px-2 text-xs font-semibold uppercase tracking-wider ${currentStyle.muted}`}
                        >
                          Files
                        </p>

                        <div className="grid gap-2 sm:grid-cols-2">
                          {fileGroups.files.map((file, index) => (
                            <FileExplorerItem
                              key={`${file.name}-${index}`}
                              name={file.name}
                              type={file.type}
                              style={currentStyle}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* =================================================
              INSTALLATION
          ================================================= */}

          {installationSteps.length > 0 && (
            <section className="mt-28">
              <SectionHeader
                eyebrow="Installation"
                title="Get started quickly"
                description={`Follow these steps to start using ${template.title}.`}
                style={currentStyle}
              />

              <div className="mx-auto mt-10 max-w-4xl">
                <div className="relative">
                  <div
                    className={`absolute left-[19px] top-6 hidden h-[calc(100%-48px)] w-px sm:block ${currentStyle.timeline}`}
                  />

                  <div className="space-y-5">
                    {installationSteps.map((step, index) => (
                      <div
                        key={`${step}-${index}`}
                        className={`relative flex gap-5 rounded-2xl border p-5 transition-all duration-300 ${currentStyle.card}`}
                      >
                        <div
                          className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${currentStyle.icon}`}
                        >
                          {index + 1}
                        </div>

                        <div className="min-w-0 pt-1">
                          <p
                            className={`text-xs font-semibold uppercase tracking-wider ${currentStyle.accent}`}
                          >
                            Step {index + 1}
                          </p>

                          <p
                            className={`mt-2 text-sm leading-7 ${currentStyle.description}`}
                          >
                            {step}
                          </p>
                        </div>

                        <ChevronRight
                          className={`ml-auto hidden h-5 w-5 shrink-0 sm:block ${currentStyle.muted}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* =================================================
              REQUIREMENTS
          ================================================= */}

          {requirements.length > 0 && (
            <section className="mt-28">
              <SectionHeader
                eyebrow="Requirements"
                title="Before you start"
                description={`Everything you need before installing ${template.title}.`}
                style={currentStyle}
              />

              <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
                {requirements.map((requirement, index) => (
                  <div
                    key={`${requirement}-${index}`}
                    className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${currentStyle.card}`}
                  >
                    <div className="flex gap-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${currentStyle.requirementIcon}`}
                      >
                        <Check className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <p
                          className={`text-xs font-semibold uppercase tracking-wider ${currentStyle.accent}`}
                        >
                          Requirement {String(index + 1).padStart(2, "0")}
                        </p>

                        <p
                          className={`mt-2 text-sm leading-7 ${currentStyle.description}`}
                        >
                          {requirement}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* =================================================
              CTA
          ================================================= */}

          <div
            className={`mt-28 rounded-3xl border p-8 text-center sm:p-12 lg:p-16 ${currentStyle.cta}`}
          >
            <div
              className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${currentStyle.icon}`}
            >
              <Rocket className="h-6 w-6" />
            </div>

            <h3
              className={`text-3xl font-bold sm:text-4xl ${currentStyle.heading}`}
            >
              Ready to use {template.title}?
            </h3>

            <p
              className={`mx-auto mt-4 max-w-xl leading-7 ${currentStyle.description}`}
            >
              Start building your next project with this template.
            </p>

            <button
              type="button"
              className={`mt-7 rounded-xl px-6 py-3 text-sm font-semibold ${currentStyle.primaryButton}`}
            >
              Get Started
            </button>
          </div>
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
    <div className="mx-auto max-w-2xl text-center">
      <p
        className={`text-sm font-semibold uppercase tracking-wider ${style.accent}`}
      >
        {eyebrow}
      </p>

      <h3 className={`mt-3 text-3xl font-bold ${style.heading}`}>
        {title}
      </h3>

      <p className={`mt-4 ${style.description}`}>{description}</p>
    </div>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  label,
  value,
  style,
}: {
  label: string;
  value: string;
  style: ReturnType<typeof getStyleConfig>;
}) {
  return (
    <div className={`rounded-2xl border p-5 ${style.card}`}>
      <p
        className={`text-xs font-medium uppercase tracking-wider ${style.muted}`}
      >
        {label}
      </p>

      <p className={`mt-2 truncate text-base font-semibold ${style.text}`}>
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   FILE EXPLORER ITEM
========================================================= */

function FileExplorerItem({
  name,
  type,
  isFolder = false,
  style,
}: {
  name: string;
  type: string;
  isFolder?: boolean;
  style: ReturnType<typeof getStyleConfig>;
}) {
  const normalizedType = type?.toLowerCase();

  const isCodeFile =
    !isFolder &&
    [
      "tsx",
      "ts",
      "jsx",
      "js",
      "css",
      "scss",
      "json",
      "html",
      "py",
    ].includes(normalizedType);

  return (
    <div
      className={`
        group
        flex
        items-center
        gap-3
        rounded-xl
        border
        px-4
        py-3
        transition-all
        duration-200
        ${style.fileItem}
      `}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.fileIcon}`}
      >
        {isFolder ? (
          <Folder className="h-4 w-4" />
        ) : isCodeFile ? (
          <FileCode2 className="h-4 w-4" />
        ) : (
          <File className="h-4 w-4" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm font-medium ${style.text}`}
          title={name}
        >
          {name}
        </p>

        <p className={`mt-0.5 text-xs ${style.muted}`}>
          {isFolder ? "Folder" : type || "File"}
        </p>
      </div>

      <ChevronRight
        className={`h-4 w-4 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${style.muted}`}
      />
    </div>
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

/* =========================================================
   STYLE CONFIGURATION
========================================================= */

function getStyleConfig(style: DemoStyle) {
  switch (style) {
    case "minimal":
      return {
        page: "bg-white text-gray-900",

        toolbar: "border-gray-200 bg-white/90",

        selectorWrapper: "border-gray-200 bg-white",

        background:
          "bg-gradient-to-b from-white via-gray-50 to-white",

        text: "text-gray-900",

        heading: "text-gray-950",

        muted: "text-gray-500",

        description: "text-gray-600",

        accent: "text-gray-900",

        badge:
          "border-gray-200 bg-gray-50 text-gray-700",

        tag:
          "border-gray-200 bg-gray-50 text-gray-600",

        selector:
          "text-gray-600 hover:bg-gray-100",

        selectorActive:
          "bg-gray-900 text-white",

        primaryButton:
          "bg-gray-900 text-white hover:bg-gray-800",

        secondaryButton:
          "border-gray-300 bg-white text-gray-900 hover:bg-gray-50",

        preview:
          "border-gray-200 bg-white shadow-sm",

        previewHeader:
          "border-gray-200 bg-gray-50",

        address:
          "bg-gray-200",

        visual:
          "border-gray-200 bg-gray-50",

        icon:
          "bg-gray-900 text-white",

        card:
          "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm",

        tech:
          "border-gray-200 bg-gray-50 text-gray-800",

        filePanel:
          "border-gray-200 bg-white",

        fileHeader:
          "border-gray-200 bg-gray-50",

        fileCount:
          "bg-gray-100 text-gray-600",

        fileItem:
          "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50",

        fileIcon:
          "bg-gray-100 text-gray-700",

        fileRow:
          "border-gray-200",

        fileType:
          "bg-gray-100 text-gray-600",

        requirementIcon:
          "bg-gray-100 text-gray-700",

        timeline:
          "bg-gray-200",

        cta:
          "border-gray-200 bg-gray-50",
      };

    case "dark":
      return {
        page: "bg-[#09090b] text-white",

        toolbar:
          "border-white/10 bg-[#09090b]/90",

        selectorWrapper:
          "border-white/10 bg-white/[0.03]",

        background:
          "bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.16),transparent_45%)]",

        text: "text-white",

        heading: "text-white",

        muted: "text-zinc-500",

        description: "text-zinc-400",

        accent: "text-indigo-400",

        badge:
          "border-indigo-400/20 bg-indigo-400/10 text-indigo-300",

        tag:
          "border-white/10 bg-white/5 text-white/70",

        selector:
          "text-zinc-400 hover:bg-white/5",

        selectorActive:
          "bg-indigo-500 text-white",

        primaryButton:
          "bg-indigo-500 text-white hover:bg-indigo-400",

        secondaryButton:
          "border-white/10 bg-white/5 text-white hover:bg-white/10",

        preview:
          "border-white/10 bg-zinc-950 shadow-2xl shadow-indigo-500/10",

        previewHeader:
          "border-white/10 bg-white/[0.03]",

        address:
          "bg-white/5",

        visual:
          "border-white/10 bg-white/[0.03]",

        icon:
          "bg-indigo-500/20 text-indigo-300",

        card:
          "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]",

        tech:
          "border-white/10 bg-white/5 text-white/80",

        filePanel:
          "border-white/10 bg-white/[0.03]",

        fileHeader:
          "border-white/10 bg-white/[0.04]",

        fileCount:
          "bg-white/5 text-white/60",

        fileItem:
          "border-white/10 bg-white/[0.02] hover:bg-white/[0.06]",

        fileIcon:
          "bg-indigo-500/10 text-indigo-300",

        fileRow:
          "border-white/10",

        fileType:
          "bg-white/5 text-white/60",

        requirementIcon:
          "bg-indigo-500/10 text-indigo-300",

        timeline:
          "bg-white/10",

        cta:
          "border-indigo-500/20 bg-indigo-500/10",
      };

    case "glass":
      return {
        page: "bg-slate-950 text-white",

        toolbar:
          "border-white/10 bg-white/10",

        selectorWrapper:
          "border-white/10 bg-white/10 backdrop-blur-xl",

        background:
          "bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.35),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.35),transparent_30%),linear-gradient(135deg,#020617,#0f172a)]",

        text: "text-white",

        heading: "text-white",

        muted: "text-white/50",

        description: "text-white/65",

        accent: "text-cyan-300",

        badge:
          "border-white/20 bg-white/10 text-white/80 backdrop-blur-xl",

        tag:
          "border-white/20 bg-white/10 text-white/70 backdrop-blur-xl",

        selector:
          "text-white/60 hover:bg-white/10",

        selectorActive:
          "bg-white/20 text-white backdrop-blur-xl",

        primaryButton:
          "bg-white text-slate-950 hover:bg-white/90",

        secondaryButton:
          "border-white/20 bg-white/10 text-white hover:bg-white/20",

        preview:
          "border-white/20 bg-white/10 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl",

        previewHeader:
          "border-white/10 bg-white/5",

        address:
          "bg-white/10",

        visual:
          "border-white/10 bg-white/5 backdrop-blur-xl",

        icon:
          "bg-white/10 text-cyan-300 backdrop-blur-xl",

        card:
          "border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10",

        tech:
          "border-white/20 bg-white/10 text-white/80 backdrop-blur-xl",

        filePanel:
          "border-white/10 bg-white/5 backdrop-blur-xl",

        fileHeader:
          "border-white/10 bg-white/5",

        fileCount:
          "bg-white/10 text-white/70",

        fileItem:
          "border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10",

        fileIcon:
          "bg-white/10 text-cyan-300",

        fileRow:
          "border-white/10",

        fileType:
          "bg-white/10 text-white/60",

        requirementIcon:
          "bg-white/10 text-cyan-300",

        timeline:
          "bg-white/10",

        cta:
          "border-white/10 bg-white/10 backdrop-blur-xl",
      };

    case "modern":
    default:
      return {
        page:
          "bg-slate-50 text-slate-900",

        toolbar:
          "border-slate-200 bg-white/90",

        selectorWrapper:
          "border-slate-200 bg-white",

        background:
          "bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_40%)]",

        text:
          "text-slate-900",

        heading:
          "text-slate-950",

        muted:
          "text-slate-500",

        description:
          "text-slate-600",

        accent:
          "text-indigo-600",

        badge:
          "border-indigo-200 bg-indigo-50 text-indigo-700",

        tag:
          "border-slate-200 bg-white text-slate-600",

        selector:
          "text-slate-600 hover:bg-slate-100",

        selectorActive:
          "bg-indigo-600 text-white",

        primaryButton:
          "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500",

        secondaryButton:
          "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",

        preview:
          "border-slate-200 bg-white shadow-xl shadow-slate-900/5",

        previewHeader:
          "border-slate-200 bg-slate-50",

        address:
          "bg-slate-200",

        visual:
          "border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50",

        icon:
          "bg-indigo-600 text-white",

        card:
          "border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg",

        tech:
          "border-slate-200 bg-white text-slate-700 shadow-sm",

        filePanel:
          "border-slate-200 bg-white shadow-xl shadow-slate-900/5",

        fileHeader:
          "border-slate-200 bg-slate-50",

        fileCount:
          "bg-indigo-50 text-indigo-600",

        fileItem:
          "border-slate-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/40",

        fileIcon:
          "bg-indigo-50 text-indigo-600",

        fileRow:
          "border-slate-200",

        fileType:
          "bg-slate-100 text-slate-600",

        requirementIcon:
          "bg-emerald-50 text-emerald-600",

        timeline:
          "bg-slate-200",

        cta:
          "border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50",
      };
  }
}