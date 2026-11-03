"""
Builds Manas Kapoor's resume from resume.json.

Outputs:
  public/resume/Manas_Kapoor_Resume.pdf    (served by the website, downloadable)
  resume/Manas_Kapoor_Resume.docx          (editable version)
  src/assets/resume-preview.webp           (preview image shown on the website)

Usage:  python resume/build_resume.py
Needs:  reportlab, python-docx, pymupdf, pillow
"""
import json
import os
from xml.sax.saxutils import escape

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate,
                                Spacer, Table, TableStyle)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = json.load(open(os.path.join(ROOT, "resume", "resume.json"), encoding="utf-8"))
PDF_OUT = os.path.join(ROOT, "public", "resume", "Manas_Kapoor_Resume.pdf")
DOCX_OUT = os.path.join(ROOT, "resume", "Manas_Kapoor_Resume.docx")
PREVIEW_OUT = os.path.join(ROOT, "src", "assets", "resume-preview.webp")

INK = HexColor("#111111")
MUTED = HexColor("#555555")
LINK = HexColor("#1a1a1a")

# ---------- fonts (Calibri when available, Helvetica otherwise) ----------
FONT, BOLD, ITALIC = "Helvetica", "Helvetica-Bold", "Helvetica-Oblique"
win = os.environ.get("WINDIR", "C:\\Windows")
try:
    pdfmetrics.registerFont(TTFont("Calibri", os.path.join(win, "Fonts", "calibri.ttf")))
    pdfmetrics.registerFont(TTFont("Calibri-Bold", os.path.join(win, "Fonts", "calibrib.ttf")))
    pdfmetrics.registerFont(TTFont("Calibri-Italic", os.path.join(win, "Fonts", "calibrii.ttf")))
    from reportlab.pdfbase.pdfmetrics import registerFontFamily
    registerFontFamily("Calibri", normal="Calibri", bold="Calibri-Bold", italic="Calibri-Italic")
    FONT, BOLD, ITALIC = "Calibri", "Calibri-Bold", "Calibri-Italic"
except Exception:
    pass

BASE = 9.6
S = {
    "name": ParagraphStyle("name", fontName=BOLD, fontSize=21, leading=24, alignment=TA_CENTER, textColor=INK),
    "headline": ParagraphStyle("headline", fontName=FONT, fontSize=10.5, leading=13, alignment=TA_CENTER, textColor=MUTED),
    "contact": ParagraphStyle("contact", fontName=FONT, fontSize=8.7, leading=12, alignment=TA_CENTER, textColor=INK),
    "h": ParagraphStyle("h", fontName=BOLD, fontSize=10.5, leading=13, textColor=INK, spaceBefore=7),
    "body": ParagraphStyle("body", fontName=FONT, fontSize=BASE, leading=12.3, textColor=INK),
    "role": ParagraphStyle("role", fontName=FONT, fontSize=BASE + 0.4, leading=12.6, textColor=INK),
    "date": ParagraphStyle("date", fontName=FONT, fontSize=BASE, leading=12.6, textColor=INK, alignment=2),
    "bullet": ParagraphStyle("bullet", fontName=FONT, fontSize=BASE, leading=12.2, textColor=INK,
                             leftIndent=11, bulletIndent=2),
}


def e(t):
    return escape(t)


def a(text, href):
    return f'<a href="{e(href)}" color="#1a1a1a"><u>{e(text)}</u></a>'


def section(title):
    return [
        Paragraph(e(title.upper()), S["h"]),
        HRFlowable(width="100%", thickness=0.7, color=INK, spaceBefore=1.5, spaceAfter=3),
    ]


def row(left_html, right_html):
    t = Table([[Paragraph(left_html, S["role"]), Paragraph(right_html, S["date"])]],
              colWidths=["84%", "16%"])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
    ]))
    return t


def bullets(items):
    return [Paragraph(e(b), S["bullet"], bulletText="\u2022") for b in items]


def build_pdf():
    os.makedirs(os.path.dirname(PDF_OUT), exist_ok=True)
    doc = SimpleDocTemplate(PDF_OUT, pagesize=A4, leftMargin=15 * mm, rightMargin=15 * mm,
                            topMargin=10 * mm, bottomMargin=9 * mm,
                            title="Manas Kapoor - Resume", author="Manas Kapoor",
                            subject="Backend Engineer | Full Stack Developer",
                            keywords="Backend, Full Stack, Node.js, React, Next.js, C++")
    f = []
    f.append(Paragraph(e(DATA["name"].upper()), S["name"]))
    f.append(Paragraph(e(DATA["headline"]), S["headline"]))
    f.append(Spacer(1, 2))
    parts = [a(c["text"], c["href"]) if c.get("href") and not c["href"].startswith("tel") else e(c["text"])
             for c in DATA["contact"]]
    f.append(Paragraph("  |  ".join(parts[:3]), S["contact"]))
    f.append(Paragraph("  |  ".join(parts[3:]), S["contact"]))

    f += section("Summary")
    f.append(Paragraph(e(DATA["summary"]), S["body"]))

    f += section("Education")
    for ed in DATA["education"]:
        f.append(row(f"<b>{e(ed['title'])}</b> \u2014 {e(ed['org'])}", e(ed["date"])))
        if ed.get("detail"):
            f.append(Paragraph(e(ed["detail"]), S["body"]))

    f += section("Experience")
    for i, x in enumerate(DATA["experience"]):
        left = f"<b>{e(x['title'])}</b> \u2014 {e(x['org'])}"
        if x.get("link"):
            left += f"  |  {a(x['link']['text'], x['link']['href'])}"
        block = [row(left, e(x["date"]))] + bullets(x["bullets"])
        if i:
            block.insert(0, Spacer(1, 3))
        f.append(KeepTogether(block))

    f += section("Projects")
    for i, p in enumerate(DATA["projects"]):
        left = f"<b>{e(p['title'])}</b>"
        if p.get("stack"):
            left += f"  <font color='#555555'>| <i>{e(p['stack'])}</i></font>"
        right = a(p["link"]["text"], p["link"]["href"]) if p.get("link") else ""
        block = [row(left, right)] + bullets(p["bullets"])
        if i:
            block.insert(0, Spacer(1, 2.5))
        f.append(KeepTogether(block))

    f += section("Achievements & Activities")
    f += [Paragraph(f"<b>{e(x['lead'])}</b> \u2014 {e(x['text'])}", S["bullet"], bulletText="\u2022")
          for x in DATA["achievements"]]

    if DATA.get("certifications"):
        f += section("Certifications")
        f.append(Paragraph("  |  ".join(f"<b>{e(c['lead'])}</b> — {e(c['text'])}" for c in DATA["certifications"]), S["body"]))

    f += section("Technical Skills")
    for s in DATA["skills"]:
        f.append(Paragraph(f"<b>{e(s['label'])}:</b> {e(s['items'])}", S["body"]))

    doc.build(f)


def build_docx():
    from docx import Document
    from docx.enum.table import WD_TABLE_ALIGNMENT
    from docx.enum.text import WD_ALIGN_PARAGRAPH
    from docx.oxml import OxmlElement
    from docx.oxml.ns import qn
    from docx.shared import Mm, Pt, RGBColor

    d = Document()
    sec = d.sections[0]
    sec.page_height, sec.page_width = Mm(297), Mm(210)
    sec.left_margin = sec.right_margin = Mm(15)
    sec.top_margin, sec.bottom_margin = Mm(12), Mm(11)

    normal = d.styles["Normal"]
    normal.font.name = "Calibri"
    normal.font.size = Pt(10)
    normal.paragraph_format.space_after = Pt(0)
    normal.paragraph_format.space_before = Pt(0)

    def para(text="", bold=False, size=None, align=None, color=None, after=0, before=0):
        p = d.add_paragraph()
        p.paragraph_format.space_after = Pt(after)
        p.paragraph_format.space_before = Pt(before)
        if align is not None:
            p.alignment = align
        if text:
            r = p.add_run(text)
            r.bold = bold
            if size:
                r.font.size = Pt(size)
            if color:
                r.font.color.rgb = RGBColor.from_string(color)
        return p

    def hyperlink(p, text, url):
        rid = p.part.relate_to(url, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
                               is_external=True)
        h = OxmlElement("w:hyperlink")
        h.set(qn("r:id"), rid)
        r = OxmlElement("w:r")
        rpr = OxmlElement("w:rPr")
        u = OxmlElement("w:u")
        u.set(qn("w:val"), "single")
        rpr.append(u)
        r.append(rpr)
        t = OxmlElement("w:t")
        t.text = text
        r.append(t)
        h.append(r)
        p._p.append(h)

    def heading(title):
        p = para(title.upper(), bold=True, size=11, before=7, after=2)
        pbdr = OxmlElement("w:pBdr")
        b = OxmlElement("w:bottom")
        for k, v in (("w:val", "single"), ("w:sz", "6"), ("w:space", "1"), ("w:color", "111111")):
            b.set(qn(k), v)
        pbdr.append(b)
        p._p.get_or_add_pPr().append(pbdr)

    def two_col(left_bold, left_rest, right, link=None):
        p = d.add_paragraph()
        p.paragraph_format.tab_stops.add_tab_stop(Mm(180), alignment=2)
        r = p.add_run(left_bold)
        r.bold = True
        if left_rest:
            p.add_run(left_rest)
        if link:
            p.add_run("  |  ")
            hyperlink(p, link["text"], link["href"])
        if right:
            p.add_run("\t" + right)
        return p

    def bullet(text, lead=None):
        p = d.add_paragraph(style="List Bullet")
        p.paragraph_format.space_after = Pt(0)
        if lead:
            p.add_run(lead).bold = True
            p.add_run(" \u2014 " + text)
        else:
            p.add_run(text)

    para(DATA["name"].upper(), bold=True, size=20, align=WD_ALIGN_PARAGRAPH.CENTER)
    para(DATA["headline"], size=10.5, align=WD_ALIGN_PARAGRAPH.CENTER, color="555555")
    p = para(align=WD_ALIGN_PARAGRAPH.CENTER)
    for i, c in enumerate(DATA["contact"]):
        if i:
            p.add_run("  |  ")
        if c.get("href") and not c["href"].startswith("tel"):
            hyperlink(p, c["text"], c["href"])
        else:
            p.add_run(c["text"])

    heading("Summary")
    para(DATA["summary"])

    heading("Education")
    for ed in DATA["education"]:
        two_col(ed["title"], " \u2014 " + ed["org"], ed["date"])
        if ed.get("detail"):
            para(ed["detail"])

    heading("Experience")
    for x in DATA["experience"]:
        two_col(x["title"], " \u2014 " + x["org"], x["date"], x.get("link"))
        for b in x["bullets"]:
            bullet(b)

    heading("Projects")
    for pr in DATA["projects"]:
        rest = f"  |  {pr['stack']}" if pr.get("stack") else ""
        two_col(pr["title"], rest, "", pr.get("link"))
        for b in pr["bullets"]:
            bullet(b)

    heading("Achievements & Activities")
    for x in DATA["achievements"]:
        bullet(x["text"], x["lead"])

    if DATA.get("certifications"):
        heading("Certifications")
        p = para()
        for i, c in enumerate(DATA["certifications"]):
            if i:
                p.add_run("  |  ")
            p.add_run(c["lead"]).bold = True
            p.add_run(" — " + c["text"])

    heading("Technical Skills")
    for s in DATA["skills"]:
        p = para()
        p.add_run(s["label"] + ": ").bold = True
        p.add_run(s["items"])

    d.core_properties.author = "Manas Kapoor"
    d.core_properties.title = "Manas Kapoor - Resume"
    d.save(DOCX_OUT)


def build_preview():
    import pymupdf as fitz
    from PIL import Image
    doc = fitz.open(PDF_OUT)
    print("pages:", doc.page_count)
    pix = doc[0].get_pixmap(dpi=150)
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    os.makedirs(os.path.dirname(PREVIEW_OUT), exist_ok=True)
    img.save(PREVIEW_OUT, "WEBP", quality=88, method=6)
    return doc.page_count


if __name__ == "__main__":
    build_pdf()
    build_docx()
    pages = build_preview()
    print("PDF  ->", PDF_OUT)
    print("DOCX ->", DOCX_OUT)
    print("PNG  ->", PREVIEW_OUT)
    if pages != 1:
        print("WARNING: resume is", pages, "pages - trim content to keep it to one page")
