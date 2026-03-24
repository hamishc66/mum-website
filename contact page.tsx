import * as React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"

// ─── Brand tokens ────────────────────────────────────────────────────────────
const colors = {
    cloudWhite: "#F7F6F4",
    softAqua: "#A7D8D6",
    deepPlum: "#5B3A70",
    charcoalGrey: "#3E3E3E",
    warmCoral: "#E97A6D",
    mutedLilac: "#C7B8E0",
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface Props {
    /** Email address that will receive the inquiry */
    destinationEmail: string
    /** Titles shown in the Artwork Interest dropdown */
    artworkTitles: string[]
    /** Background colour option */
    backgroundStyle: "Cloud White" | "Soft Aqua"
}

// ─── Shared input style helpers ───────────────────────────────────────────────
const baseInputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1.5px solid ${colors.mutedLilac}`,
    outline: "none",
    fontSize: 15,
    fontFamily: "inherit",
    color: colors.charcoalGrey,
    padding: "10px 0",
    transition: "border-color 0.25s ease",
    boxSizing: "border-box",
}

const selectStyle: React.CSSProperties = {
    ...baseInputStyle,
    appearance: "none",
    WebkitAppearance: "none",
    cursor: "pointer",
    backgroundColor: "transparent",
}

// ─── FocusInput ───────────────────────────────────────────────────────────────
interface FocusInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
}

function FocusInput({ label, id, ...rest }: FocusInputProps) {
    const [focused, setFocused] = useState(false)
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
                htmlFor={id}
                style={{
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: colors.deepPlum,
                    fontWeight: 500,
                }}
            >
                {label}
            </label>
            <input
                id={id}
                {...rest}
                onFocus={(e) => {
                    setFocused(true)
                    rest.onFocus?.(e)
                }}
                onBlur={(e) => {
                    setFocused(false)
                    rest.onBlur?.(e)
                }}
                style={{
                    ...baseInputStyle,
                    borderBottomColor: focused
                        ? colors.deepPlum
                        : colors.mutedLilac,
                }}
            />
        </div>
    )
}

// ─── FocusTextarea ────────────────────────────────────────────────────────────
interface FocusTextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string
}

function FocusTextarea({ label, id, ...rest }: FocusTextareaProps) {
    const [focused, setFocused] = useState(false)
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
                htmlFor={id}
                style={{
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: colors.deepPlum,
                    fontWeight: 500,
                }}
            >
                {label}
            </label>
            <textarea
                id={id}
                {...rest}
                onFocus={(e) => {
                    setFocused(true)
                    rest.onFocus?.(e)
                }}
                onBlur={(e) => {
                    setFocused(false)
                    rest.onBlur?.(e)
                }}
                style={{
                    ...baseInputStyle,
                    resize: "none",
                    minHeight: 120,
                    lineHeight: 1.6,
                    borderBottomColor: focused
                        ? colors.deepPlum
                        : colors.mutedLilac,
                }}
            />
        </div>
    )
}

// ─── FocusSelect ─────────────────────────────────────────────────────────────
interface FocusSelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string
    options: string[]
}

function FocusSelect({ label, id, options, ...rest }: FocusSelectProps) {
    const [focused, setFocused] = useState(false)
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label
                htmlFor={id}
                style={{
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: colors.deepPlum,
                    fontWeight: 500,
                }}
            >
                {label}
            </label>
            <select
                id={id}
                {...rest}
                onFocus={(e) => {
                    setFocused(true)
                    rest.onFocus?.(e)
                }}
                onBlur={(e) => {
                    setFocused(false)
                    rest.onBlur?.(e)
                }}
                style={{
                    ...selectStyle,
                    borderBottomColor: focused
                        ? colors.deepPlum
                        : colors.mutedLilac,
                }}
            >
                <option value="" disabled hidden>
                    Select a collection…
                </option>
                {options.map((title) => (
                    <option key={title} value={title}>
                        {title}
                    </option>
                ))}
            </select>
        </div>
    )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ContactPage({
    destinationEmail = "inquiries@gallery.com",
    artworkTitles = ["The Inner Landscape", "Between Worlds", "Art Heals"],
    backgroundStyle = "Cloud White",
}: Props) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [artwork, setArtwork] = useState("")
    const [message, setMessage] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const backgroundColor =
        backgroundStyle === "Soft Aqua" ? colors.softAqua : colors.cloudWhite

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const subject = encodeURIComponent(
            `Artwork Inquiry — ${artwork || "General"}`
        )
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nArtwork Interest: ${artwork}\n\nMessage:\n${message}`
        )
        window.location.href = `mailto:${destinationEmail}?subject=${subject}&body=${body}`
        setSubmitted(true)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
                backgroundColor,
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "72px 32px",
                boxSizing: "border-box",
                fontFamily:
                    "'Georgia', 'Times New Roman', serif",
            }}
        >
            {/* Tagline */}
            <p
                style={{
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: colors.mutedLilac,
                    marginBottom: 40,
                    fontFamily: "'Georgia', serif",
                    fontStyle: "italic",
                }}
            >
                Art that holds space
            </p>

            {/* Heading */}
            <h1
                style={{
                    fontSize: 34,
                    fontWeight: 400,
                    color: colors.deepPlum,
                    marginBottom: 12,
                    textAlign: "center",
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                }}
            >
                Inquiry
            </h1>
            <p
                style={{
                    fontSize: 15,
                    color: colors.charcoalGrey,
                    marginBottom: 56,
                    textAlign: "center",
                    lineHeight: 1.7,
                    maxWidth: 380,
                    opacity: 0.8,
                }}
            >
                We welcome all enquiries and are happy to assist you in finding
                a work that resonates.
            </p>

            {/* Form */}
            {submitted ? (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        color: colors.deepPlum,
                        fontSize: 16,
                        textAlign: "center",
                        lineHeight: 1.7,
                    }}
                >
                    Thank you for reaching out.
                    <br />
                    We'll be in touch soon.
                </motion.p>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    style={{
                        width: "100%",
                        maxWidth: 480,
                        display: "flex",
                        flexDirection: "column",
                        gap: 36,
                    }}
                    noValidate
                >
                    <FocusInput
                        id="inquiry-name"
                        label="Name"
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                    />
                    <FocusInput
                        id="inquiry-email"
                        label="Email Address"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                    <FocusSelect
                        id="inquiry-artwork"
                        label="Artwork Interest"
                        value={artwork}
                        options={artworkTitles}
                        onChange={(e) => setArtwork(e.target.value)}
                    />
                    <FocusTextarea
                        id="inquiry-message"
                        label="Message"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your interest…"
                        rows={5}
                    />

                    <button
                        type="submit"
                        style={{
                            alignSelf: "flex-start",
                            background: colors.warmCoral,
                            color: "#fff",
                            border: "none",
                            borderRadius: 2,
                            padding: "14px 36px",
                            fontSize: 13,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            transition: "opacity 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.opacity =
                                "0.85")
                        }
                        onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLButtonElement).style.opacity =
                                "1")
                        }
                    >
                        Send Inquiry
                    </button>
                </form>
            )}

            {/* Footer tagline */}
            <p
                style={{
                    marginTop: 72,
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: colors.mutedLilac,
                    opacity: 0.7,
                }}
            >
                Art that holds space
            </p>
        </motion.div>
    )
}

// ─── Framer property controls ─────────────────────────────────────────────────
addPropertyControls(ContactPage, {
    destinationEmail: {
        type: ControlType.String,
        title: "Destination Email",
        defaultValue: "inquiries@gallery.com",
        placeholder: "recipient@domain.com",
    },
    artworkTitles: {
        type: ControlType.Array,
        title: "Artwork Titles",
        control: {
            type: ControlType.String,
            placeholder: "Artwork title…",
        },
        defaultValue: ["The Inner Landscape", "Between Worlds", "Art Heals"],
    },
    backgroundStyle: {
        type: ControlType.Enum,
        title: "Background",
        options: ["Cloud White", "Soft Aqua"],
        optionTitles: ["Cloud White (#F7F6F4)", "Soft Aqua (#A7D8D6)"],
        defaultValue: "Cloud White",
    },
})
