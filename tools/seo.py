#!/usr/bin/env python3
"""Page titles, descriptions and structured data. Idempotent; run after edits.

Titles lead with the phrases Malaysians search for ("buat website",
"harga website", "contoh website") and stay under ~60 characters so Google
shows them in full; descriptions stay under ~160.
"""
import html
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://bina24jam.vercel.app'

PAGES = {
    'index.html': (
        'Buat Website Bisnes RM299, Siap 24 Jam | Bina 24 Jam',
        'Buat website bisnes dari RM299, siap dalam 24 jam. Design website, SEO & video untuk bisnes di KL & Selangor. Deposit 30%, baki selepas anda puas hati.'),
    'about.html': (
        'Tentang Bina 24 Jam: Studio Web Design Malaysia',
        'Studio web design Malaysia yang bina website bertaraf dunia untuk bisnes kecil, lebih pantas dan jauh lebih murah daripada agensi biasa.'),
    'packages.html': (
        'Harga Website Malaysia dari RM299: Pakej | Bina 24 Jam',
        'Harga buat website yang jelas: Launch RM299, Business RM499, Signature RM999. Domain + hosting percuma tahun pertama. Deposit 30%, baki bila siap.'),
    'portfolio.html': (
        'Contoh Website Bisnes Malaysia: Portfolio | Bina 24 Jam',
        'Contoh website yang kami bina untuk bisnes Malaysia: kafe, klinik, hartanah, salon, pusat tuisyen, servis aircond, katering dan banyak lagi.'),
    'how-it-works.html': (
        'Cara Buat Website Dalam 24 Jam: Proses Kami | Bina 24 Jam',
        'Dari hello sampai live dalam 24 jam. Tiada brief panjang, tiada meeting. Pilih pakej, bayar deposit 30%, dan website bisnes anda siap dalam sehari.'),
    'faq.html': (
        'Soalan Lazim Buat Website (FAQ) | Bina 24 Jam',
        'Jawapan jujur tentang harga website, proses 24 jam, domain, hosting, pindaan dan pembayaran, untuk pemilik bisnes di Malaysia.'),
    'contact.html': (
        'Hubungi Kami: WhatsApp 011-7511 2280 | Bina 24 Jam',
        'Nak buat website untuk bisnes anda? WhatsApp 011-7511 2280 atau hantar mesej. Tiada deposit, tiada meeting, tiada komitmen sampai anda nak mula.'),
    'terms.html': (
        'Terma & Syarat | Bina 24 Jam',
        'Terma dan syarat servis pembinaan website Bina 24 Jam: skop servis, kandungan, pindaan, terma bayaran, domain dan hosting.'),
    'privacy.html': (
        'Dasar Privasi | Bina 24 Jam',
        'Dasar privasi Bina 24 Jam: data yang kami kumpul, cara ia digunakan dan hak anda di bawah Akta Perlindungan Data Peribadi 2010 (PDPA).'),
}


def set_meta(s, title, desc):
    t, d = html.escape(title), html.escape(desc)
    s = re.sub(r'<title>[^<]*</title>', '<title>%s</title>' % t, s, count=1)
    s = re.sub(r'(<meta name="description" content=")[^"]*', lambda m: m.group(1) + d, s, count=1)
    for k in ('og:title', 'twitter:title'):
        s = re.sub(r'(<meta (?:property|name)="%s" content=")[^"]*' % k, lambda m: m.group(1) + t, s, count=1)
    for k in ('og:description', 'twitter:description'):
        s = re.sub(r'(<meta (?:property|name)="%s" content=")[^"]*' % k, lambda m: m.group(1) + d, s, count=1)
    return s


def business_logo(s):
    # Google wants a square logo for the business, not the 1200x630 share card.
    return s.replace('"logo": "%s/og-image.png"' % SITE, '"logo": "%s/logo.png"' % SITE)


def faq_schema(s):
    """FAQPage JSON-LD from the <details>/<summary> pairs in the page template."""
    m = re.search(r'<script type="application/json" id="b24-dc">(.*?)</script>', s, re.S)
    tpl = json.loads(m.group(1)) if m else s
    qa = []
    for q, a in re.findall(r'<details[^>]*>\s*<summary[^>]*>(.*?)</summary>(.*?)</details>', tpl, re.S):
        text = lambda x: html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', x))).strip()
        if '{{' in q + a:
            continue
        qa.append({'@type': 'Question', 'name': text(q),
                   'acceptedAnswer': {'@type': 'Answer', 'text': text(a)}})
    data = {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': qa}
    tag = '<script type="application/ld+json" id="b24-faq">%s</script>' % \
        json.dumps(data, ensure_ascii=False).replace('</', '<\\/')
    s = re.sub(r'<script type="application/ld\+json" id="b24-faq">.*?</script>\n?', '', s, flags=re.S)
    return s.replace('</head>', tag + '\n</head>', 1), len(qa)


def main():
    for name, (title, desc) in PAGES.items():
        path = os.path.join(ROOT, name)
        s = open(path, encoding='utf-8').read()
        s = business_logo(set_meta(s, title, desc))
        extra = ''
        if name == 'faq.html':
            s, n = faq_schema(s)
            extra = ', %d FAQ entries' % n
        open(path, 'w', encoding='utf-8').write(s)
        print('%s: %d/%d chars%s' % (name, len(title), len(desc), extra))


if __name__ == '__main__':
    main()
