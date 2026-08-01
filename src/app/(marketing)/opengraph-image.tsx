import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const brand = {
  paper: "#fbfaf5",
  paper2: "#f1eee4",
  ink: "#121214",
  muted: "#5b5c63",
  violet: "#6c3ef4",
  violetTint: "#eae1fe",
  coral: "#ff5a36",
  coralTint: "#ffe4db",
  lime: "#c6ff4d",
  limeTint: "#eefccb",
} as const;

async function loadGoogleFont(family: string, weight: number) {
  const familyParam = family.replace(/ /g, "+");
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weight}&display=swap`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
      },
    },
  ).then((response) => response.text());

  const match =
    css.match(/src: url\(([^)]+)\) format\('(opentype|truetype)'\)/) ??
    css.match(/src: url\(([^)]+)\) format\('woff'\)/);

  if (!match?.[1]) {
    throw new Error(`Failed to load font: ${family}`);
  }

  return fetch(match[1]).then((response) => response.arrayBuffer());
}

export default async function OgImage() {
  const [logoBuffer, unboundedBold, interRegular, interMedium, monoBold] =
    await Promise.all([
      readFile(join(process.cwd(), "public/logo.png")),
      loadGoogleFont("Unbounded", 700),
      loadGoogleFont("Inter", 400),
      loadGoogleFont("Inter", 500),
      loadGoogleFont("Space Mono", 700),
    ]);

  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: brand.paper,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(${brand.ink} 1.5px, transparent 1.5px)`,
            backgroundSize: "26px 26px",
            opacity: 0.06,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: `linear-gradient(90deg, ${brand.violet} 0%, ${brand.coral} 52%, ${brand.lime} 100%)`,
            borderBottom: `2.5px solid ${brand.ink}`,
          }}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "52px 64px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 640,
              gap: 28,
            }}
          >
            <img src={logoSrc} alt="" height={40} style={{ objectFit: "contain" }} />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                alignSelf: "flex-start",
                background: brand.ink,
                color: brand.paper,
                fontFamily: "Space Mono",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                padding: "10px 18px",
                borderRadius: 100,
                border: `2.5px solid ${brand.ink}`,
                transform: "rotate(-2deg)",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: brand.lime,
                }}
              />
              <span style={{ display: "flex" }}>Web · App · AI · {site.legalName}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  fontFamily: "Unbounded",
                  fontSize: 58,
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: brand.ink,
                }}
              >
                <span style={{ display: "flex" }}>Big ideas,</span>
                <span
                  style={{
                    display: "flex",
                    position: "relative",
                    marginLeft: 12,
                    marginRight: 12,
                    padding: "0 8px",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: 8,
                      bottom: 6,
                      background: brand.lime,
                      border: `2.5px solid ${brand.ink}`,
                      borderRadius: 8,
                      transform: "rotate(-1.5deg)",
                    }}
                  />
                  <span style={{ display: "flex", position: "relative" }}>built</span>
                </span>
                <span style={{ display: "flex" }}>and shipped fast.</span>
              </div>

              <div
                style={{
                  display: "flex",
                  fontFamily: "Inter",
                  fontSize: 24,
                  fontWeight: 500,
                  lineHeight: 1.45,
                  color: brand.muted,
                  maxWidth: 560,
                }}
              >
                Senior web, app, and AI development for founders — fixed timelines, full code
                ownership, no junior handoffs.
              </div>
            </div>

            <div style={{ display: "flex", gap: 14 }}>
              {[
                { value: "550+", label: "Products shipped" },
                { value: "10+", label: "Technologies" },
                { value: "8 yrs", label: "Since 2019" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    background: brand.paper,
                    border: `2.5px solid ${brand.ink}`,
                    borderRadius: 14,
                    padding: "12px 16px",
                    boxShadow: `4px 4px 0 ${brand.ink}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Unbounded",
                      fontSize: 22,
                      fontWeight: 700,
                      color: brand.ink,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontFamily: "Space Mono",
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: brand.muted,
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              position: "relative",
              width: 360,
              height: 420,
              marginRight: 12,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 280,
                display: "flex",
                flexDirection: "column",
                background: brand.paper,
                border: `2.5px solid ${brand.ink}`,
                borderRadius: 16,
                boxShadow: `6px 6px 0 ${brand.ink}`,
                transform: "rotate(-5deg)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  padding: "12px 14px",
                  borderBottom: `2.5px solid ${brand.ink}`,
                  background: brand.violetTint,
                }}
              >
                {[brand.violet, brand.coral, brand.lime].map((color) => (
                  <div
                    key={color}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: color,
                      border: `1.5px solid ${brand.ink}`,
                    }}
                  />
                ))}
              </div>
              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                <div
                  style={{
                    width: "68%",
                    height: 14,
                    borderRadius: 4,
                    background: brand.violet,
                  }}
                />
                <div
                  style={{
                    width: "92%",
                    height: 8,
                    borderRadius: 3,
                    background: brand.ink,
                    opacity: 0.12,
                  }}
                />
                <div
                  style={{
                    width: "80%",
                    height: 8,
                    borderRadius: 3,
                    background: brand.ink,
                    opacity: 0.12,
                  }}
                />
                <div
                  style={{
                    marginTop: 8,
                    width: 84,
                    height: 28,
                    borderRadius: 100,
                    background: brand.lime,
                    border: `2px solid ${brand.ink}`,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                position: "absolute",
                right: 0,
                top: 120,
                width: 120,
                height: 190,
                background: brand.paper,
                border: `2.5px solid ${brand.ink}`,
                borderRadius: 24,
                boxShadow: `6px 6px 0 ${brand.ink}`,
                transform: "rotate(6deg)",
                padding: 10,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 16,
                  border: `2px solid ${brand.ink}`,
                  background: brand.coralTint,
                  padding: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", gap: 5 }}>
                  {[0, 1, 2].map((dot) => (
                    <div
                      key={dot}
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: brand.coral,
                        border: `1.5px solid ${brand.ink}`,
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    height: 34,
                    borderRadius: 8,
                    background: brand.paper,
                    border: `1.5px solid ${brand.ink}`,
                  }}
                />
                <div
                  style={{
                    height: 34,
                    borderRadius: 8,
                    background: brand.paper,
                    border: `1.5px solid ${brand.ink}`,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                left: 36,
                bottom: 0,
                width: 220,
                display: "flex",
                flexDirection: "column",
                background: brand.lime,
                border: `2.5px solid ${brand.ink}`,
                borderRadius: 16,
                boxShadow: `6px 6px 0 ${brand.ink}`,
                transform: "rotate(-2deg)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 14px",
                  borderBottom: `2.5px solid ${brand.ink}`,
                  fontFamily: "Space Mono",
                  fontSize: 11,
                  fontWeight: 700,
                  color: brand.ink,
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: brand.ink,
                  }}
                />
                <span style={{ display: "flex" }}>AI assistant</span>
              </div>
              <div
                style={{
                  display: "flex",
                  padding: 16,
                  fontFamily: "Space Mono",
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: brand.ink,
                }}
              >
                Ship faster with automation that fits your product.
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Unbounded", data: unboundedBold, weight: 700, style: "normal" },
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interMedium, weight: 500, style: "normal" },
        { name: "Space Mono", data: monoBold, weight: 700, style: "normal" },
      ],
    },
  );
}
