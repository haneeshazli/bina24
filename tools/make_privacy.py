#!/usr/bin/env python3
"""Build privacy.html from terms.html: same layout, privacy-policy content."""
import html
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'https://bina24jam.vercel.app/privacy'

TITLE = 'Dasar Privasi | Bina 24 Jam'
DESC = ('Dasar privasi Bina 24 Jam: data yang kami kumpul melalui borang, WhatsApp dan '
        'analytics, cara ia digunakan dan hak anda di bawah Akta Perlindungan Data Peribadi 2010.')
INTRO = ('Dasar ini menerangkan bagaimana Bina 24 Jam (“kami”) mengumpul, menggunakan dan '
         'melindungi data peribadi anda apabila anda melawat website ini, menghantar borang '
         'atau berurusan dengan kami, selaras dengan Akta Perlindungan Data Peribadi 2010 (PDPA).')
CHIPS = ['Data hanya untuk urusan anda', 'Tidak dijual kepada sesiapa', 'Padam bila-bila anda minta']

SECTIONS = [
    ('Data Yang Kami Kumpul', [
        'Maklumat yang anda isi dalam borang di website ini: nama, nombor telefon, email, nama bisnes, jenis bantuan yang diperlukan, website sedia ada dan mesej anda.',
        'Maklumat yang anda kongsi melalui WhatsApp, email atau panggilan, termasuk kandungan, logo dan gambar untuk projek anda.',
        'Data penggunaan tanpa nama seperti page yang dilawati, jenis peranti dan negara, melalui Vercel Web Analytics. Ia tidak menggunakan cookie dan tidak mengenal pasti anda secara peribadi.',
    ]),
    ('Cara Kami Gunakan Data', [
        'Untuk membalas pertanyaan anda, menyediakan sebut harga dan menghubungi anda tentang projek.',
        'Untuk membina, menghantar dan menyelenggara website atau servis yang anda order.',
        'Untuk mengeluarkan invois dan rekod bayaran seperti yang dikehendaki undang-undang.',
        'Untuk memahami page mana yang berguna dan menambah baik website ini.',
    ]),
    ('Perkongsian Data', [
        'Kami tidak menjual, menyewa atau memperdagangkan data peribadi anda.',
        'Data disimpan dan diproses oleh pembekal servis yang kami guna untuk menjalankan bisnes: Vercel (hosting website), Supabase (pangkalan data borang) dan WhatsApp (komunikasi). Mereka hanya memproses data untuk tujuan tersebut.',
        'Kami hanya akan mendedahkan data jika dikehendaki oleh undang-undang atau pihak berkuasa yang sah.',
    ]),
    ('Penyimpanan & Keselamatan', [
        'Data borang disimpan dalam pangkalan data yang dilindungi, dan hanya boleh dibaca oleh pasukan Bina 24 Jam.',
        'Semua sambungan ke website ini dan ke pangkalan data kami menggunakan HTTPS.',
        'Kami simpan data selagi perlu untuk urusan dengan anda dan rekod perakaunan, kemudian ia dipadam.',
    ]),
    ('Hak Anda', [
        'Anda boleh minta salinan data peribadi yang kami simpan tentang anda.',
        'Anda boleh minta kami membetulkan data yang salah atau tidak lengkap.',
        'Anda boleh tarik balik persetujuan dan minta data anda dipadam pada bila-bila masa, kecuali rekod yang wajib kami simpan di bawah undang-undang.',
        'Untuk sebarang permintaan, hubungi kami di WhatsApp 011-7511 2280 atau email hello@bina24jam.my. Kami akan balas dalam masa 21 hari.',
    ]),
    ('Pautan Luar', [
        'Website ini mengandungi pautan ke WhatsApp, Instagram, Facebook dan Threads. Platform tersebut mempunyai dasar privasi mereka sendiri dan kami tidak bertanggungjawab ke atas amalan mereka.',
    ]),
    ('Perubahan Dasar', [
        'Kami mungkin mengemaskini dasar ini dari semasa ke semasa. Versi terkini sentiasa dipaparkan di page ini bersama tarikh kemaskini.',
    ]),
]

EN = {
    'Dasar Privasi': 'Privacy Policy',
    'Dasar': 'Privacy', 'Privasi': 'Policy',
    'Privasi & Data': 'Privacy & Data',
    'Bina 24 Jam · Perlindungan Data Peribadi': 'Bina 24 Jam · Personal Data Protection',
    INTRO: 'This policy explains how Bina 24 Jam (“we”) collects, uses and protects your personal data when you visit this website, submit a form or deal with us, in line with the Personal Data Protection Act 2010 (PDPA).',
    'Kemaskini terakhir: September 2026': 'Last updated: September 2026',
    CHIPS[0]: 'Data used only for your enquiry', CHIPS[1]: 'Never sold to anyone', CHIPS[2]: 'Deleted whenever you ask',
    'Data Yang Kami Kumpul': 'Data We Collect',
    'Cara Kami Gunakan Data': 'How We Use Data',
    'Perkongsian Data': 'Data Sharing',
    'Penyimpanan & Keselamatan': 'Storage & Security',
    'Hak Anda': 'Your Rights',
    'Pautan Luar': 'External Links',
    'Ada soalan pasal data anda?': 'Questions about your data?',
    'Perubahan Dasar': 'Policy Changes',
    SECTIONS[0][1][0]: 'Information you enter in forms on this website: name, phone number, email, business name, the kind of help you need, your existing website and your message.',
    SECTIONS[0][1][1]: 'Information you share over WhatsApp, email or calls, including content, logos and photos for your project.',
    SECTIONS[0][1][2]: 'Anonymous usage data such as pages visited, device type and country, via Vercel Web Analytics. It uses no cookies and does not identify you personally.',
    SECTIONS[1][1][0]: 'To reply to your enquiry, prepare quotes and contact you about your project.',
    SECTIONS[1][1][1]: 'To build, deliver and maintain the website or service you ordered.',
    SECTIONS[1][1][2]: 'To issue invoices and keep payment records as required by law.',
    SECTIONS[1][1][3]: 'To understand which pages are useful and improve this website.',
    SECTIONS[2][1][0]: 'We do not sell, rent or trade your personal data.',
    SECTIONS[2][1][1]: 'Data is stored and processed by service providers we use to run the business: Vercel (website hosting), Supabase (form database) and WhatsApp (communication). They process data only for those purposes.',
    SECTIONS[2][1][2]: 'We only disclose data when required by law or a lawful authority.',
    SECTIONS[3][1][0]: 'Form data is stored in a protected database that only the Bina 24 Jam team can read.',
    SECTIONS[3][1][1]: 'All connections to this website and to our database use HTTPS.',
    SECTIONS[3][1][2]: 'We keep data only as long as needed for our dealings with you and for accounting records, then delete it.',
    SECTIONS[4][1][0]: 'You can ask for a copy of the personal data we hold about you.',
    SECTIONS[4][1][1]: 'You can ask us to correct data that is wrong or incomplete.',
    SECTIONS[4][1][2]: 'You can withdraw consent and ask for your data to be deleted at any time, except records we are legally required to keep.',
    SECTIONS[4][1][3]: 'For any request, contact us on WhatsApp 011-7511 2280 or email hello@bina24jam.my. We will reply within 21 days.',
    SECTIONS[5][1][0]: 'This website links to WhatsApp, Instagram, Facebook and Threads. Those platforms have their own privacy policies and we are not responsible for their practices.',
    SECTIONS[6][1][0]: 'We may update this policy from time to time. The latest version is always shown on this page with its update date.',
}

e = html.escape


def main():
    s = open(os.path.join(ROOT, 'terms.html'), encoding='utf-8').read()

    # Head metadata
    s = s.replace('<title>Terma &amp; Syarat | Bina 24 Jam</title>', '<title>%s</title>' % e(TITLE))
    s = re.sub(r'(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*"',
               lambda m: m.group(1) + e(DESC) + '"', s)
    s = re.sub(r'(<meta (?:property|name)="(?:og:title|twitter:title)" content=")[^"]*"',
               lambda m: m.group(1) + e(TITLE) + '"', s)
    s = s.replace('https://bina24jam.vercel.app/terms"', URL + '"')
    s = s.replace('"name": "Terma & Syarat", "item": "https://bina24jam.vercel.app/terms"',
                  '"name": "Dasar Privasi", "item": "%s"' % URL)
    dict_js = '<script>window.B24_EN=Object.assign(window.B24_EN||{},%s);</script>' % \
        json.dumps(EN, ensure_ascii=False).replace('</', '<\\/')
    s = s.replace('</head>', dict_js + '\n</head>', 1)
    s = re.sub(r'<h1>Terma &amp; Syarat</h1><p>[^<]*</p>',
               '<h1>Dasar Privasi</h1><p>%s</p>' % e(INTRO), s)

    # Hero
    s = s.replace('tone="lime" hint-size="auto,26px">Dokumen Servis</x-import>',
                  'tone="lime" hint-size="auto,26px">Privasi &amp; Data</x-import>')
    s = s.replace('>Terma &amp; <span style="font-family:var(--font-display-italic);font-style:italic;font-weight:400;color:var(--accent-green)">Syarat</span></h1>',
                  '>Dasar <span style="font-family:var(--font-display-italic);font-style:italic;font-weight:400;color:var(--accent-green)">Privasi</span></h1>')
    s = s.replace('Bina 24 Jam · Servis Pembinaan Website</p>', 'Bina 24 Jam · Perlindungan Data Peribadi</p>')
    s = re.sub(r'Dokumen ini menerangkan terma dan syarat[^<]*</p>', e(INTRO, quote=False) + '</p>', s)
    for old, new in zip(['Deposit 30% untuk mula', 'Baki 70% selepas anda sahkan', 'Website milik anda sepenuhnya'], CHIPS):
        s = s.replace('color:var(--text-primary)">%s</span></div>' % old,
                      'color:var(--text-primary)">%s</span></div>' % e(new), 1)

    s = s.replace('Ada soalan pasal terma ini?</h2>', 'Ada soalan pasal data anda?</h2>')

    # Table of contents + sections, rebuilt with the same markup as terms
    toc_a = s.index('<a href="#s1"')
    toc_b = s.index('</nav>', toc_a)
    link = re.search(r'<a href="#s1"[^>]*>', s).group(0)
    toc = ''.join(
        '\n          ' + link.replace('#s1', '#s%d' % i) +
        '<span style="font-weight:600;color:var(--accent-green)">%02d</span><span>%s</span></a>' % (i, e(t))
        for i, (t, _) in enumerate(SECTIONS, 1)) + '\n      '
    s = s[:toc_a] + toc + s[toc_b:]

    sec_a = s.index('<section id="s1"')
    sec_b = s.index('</section>', s.index('<section id="s9"')) + len('</section>')
    tmpl = s[sec_a:s.index('</section>', sec_a) + len('</section>')]
    head_end = tmpl.index('<div style="display:flex;flex-direction:column;gap:14px">')
    sec_head = tmpl[:head_end]
    item = re.search(r'<div style="display:grid;grid-template-columns:40px minmax\(0,1fr\);gap:12px">.*?</div>', tmpl).group(0)
    out = []
    for i, (title, paras) in enumerate(SECTIONS, 1):
        h = sec_head.replace('id="s1"', 'id="s%d"' % i).replace('>01</span>', '>%02d</span>' % i)
        h = re.sub(r'(<h2[^>]*>)Skop Servis(</h2>)', lambda m: m.group(1) + e(title) + m.group(2), h)
        body = ''.join('\n            ' + re.sub(r'>1\.1<', '>%d.%d<' % (i, j), re.sub(r'(<p[^>]*>).*?(</p>)', lambda m: m.group(1) + e(p, quote=False) + m.group(2), item))
                       for j, p in enumerate(paras, 1))
        out.append(h + '<div style="display:flex;flex-direction:column;gap:14px">' + body + '\n          </div>\n        </section>')
    s = s[:sec_a] + '\n        '.join(out) + s[sec_b:]

    open(os.path.join(ROOT, 'privacy.html'), 'w', encoding='utf-8').write(s)
    print('privacy.html', len(s))


if __name__ == '__main__':
    main()
