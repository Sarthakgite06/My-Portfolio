import os
import sys
import subprocess

try:
    import reportlab
except ImportError:
    print("Installing reportlab library...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "reportlab"])
    import reportlab

from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def create_resume_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=40,
        bottomMargin=40
    )
    
    styles = getSampleStyleSheet()
    
    primary_color = colors.HexColor("#0f172a")
    secondary_color = colors.HexColor("#1e293b")
    text_color = colors.HexColor("#334155")
    link_color = colors.HexColor("#2563eb")
    
    name_style = ParagraphStyle(
        'NameStyle', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=24, leading=28,
        textColor=primary_color, alignment=TA_CENTER
    )
    
    title_style = ParagraphStyle(
        'TitleStyle', parent=styles['Normal'],
        fontName='Helvetica-Oblique', fontSize=11, leading=15,
        textColor=secondary_color, alignment=TA_CENTER, spaceAfter=4
    )
    
    contact_style = ParagraphStyle(
        'ContactStyle', parent=styles['Normal'],
        fontName='Helvetica', fontSize=9, leading=13,
        textColor=text_color, alignment=TA_CENTER
    )
    
    section_heading_style = ParagraphStyle(
        'SectionHeading', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=11, leading=14,
        textColor=primary_color, spaceBefore=8, spaceAfter=3
    )
    
    body_style = ParagraphStyle(
        'Body', parent=styles['Normal'],
        fontName='Helvetica', fontSize=9, leading=12.5,
        textColor=text_color, spaceAfter=4
    )
    
    bullet_style = ParagraphStyle(
        'Bullet', parent=styles['Normal'],
        fontName='Helvetica', fontSize=8.8, leading=12,
        textColor=text_color, leftIndent=12, firstLineIndent=-8, spaceAfter=3
    )
    
    item_title_style = ParagraphStyle(
        'ItemTitle', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=9.8, leading=12.5,
        textColor=primary_color
    )
    
    item_meta_style = ParagraphStyle(
        'ItemMeta', parent=styles['Normal'],
        fontName='Helvetica-Oblique', fontSize=9, leading=12,
        textColor=text_color
    )
    
    story = []
    
    # Header
    story.append(Paragraph("Sarthak. S. Gite", name_style))
    story.append(Paragraph("Full Stack Developer & AI Enthusiast", title_style))
    
    contact_text = (
        "Balewadi, Pune (411045) | sarthakgite006@gmail.com | "
        "LinkedIn | GitHub | Portfolio | LeetCode"
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor("#94a3b8"), spaceAfter=6))
    
    # Summary
    story.append(Paragraph("SUMMARY", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceAfter=4))
    summary_text = (
        "AI & Data Science student and Full Stack Developer with hands-on internship and leadership experience in machine learning, "
        "front-end development, and global project management. Proven ability to lead international teams, deploy scalable data-driven "
        "applications, and build end-to-end user-focused platforms."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))
    
    # Professional Experience
    story.append(Paragraph("PROFESSIONAL EXPERIENCE", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceAfter=4))
    
    experiences = [
        ("Twinmind AI (USA)", "City Head", "Remote", "Nov 2025 – Mar 2026", [
            "Spearheaded regional operations and local market strategy for an international AI tech platform, reporting to global stakeholders.",
            "Drove developer community engagement and technical collaboration initiatives to expand the platform's presence in the local market."
        ]),
        ("Codec Technologies", "Project Head Intern", "Pune, India", "Mar 2025 – Apr 2025", [
            "Led end-to-end execution of technology projects ensuring timely delivery, team collaboration, and alignment with organizational goals.",
            "Oversaw project planning, resource allocation, progress tracking, and stakeholder communication."
        ]),
        ("Codexintern", "Front-End Development Intern", "Virtual", "Aug 2025", [
            "Built scalable, user-centric web interfaces; translated wireframes into functional components using modern frontend technologies.",
            "Ensured mobile responsiveness and cross-browser compatibility across corporate digital applications."
        ]),
        ("NeuAi Labs", "Intern", "Pune, India", "Dec 2024 – Jan 2025", [
            "Developed a Customer Churn Prediction System using Python and ML models with feature engineering and hyperparameter tuning.",
            "Performed data analysis and visualization using SQL, MongoDB, Pandas, and Matplotlib for actionable business insights."
        ]),
        ("Techfest, IIT Bombay", "College Ambassador", "Pune, India", "Sept 2025", [
            "Represented Asia's Largest Science & Technology Festival; ranked in Top 2000 by managing peer coordination and campus event promotions."
        ])
    ]
    
    for comp, role, loc, date, bullets in experiences:
        t_data = [
            [Paragraph(f"<b>{comp}</b>", item_title_style), Paragraph(loc, ParagraphStyle('R1', parent=item_meta_style, alignment=TA_RIGHT))],
            [Paragraph(f"<i>{role}</i>", item_meta_style), Paragraph(date, ParagraphStyle('R2', parent=item_meta_style, alignment=TA_RIGHT))]
        ]
        t = Table(t_data, colWidths=[380, 152])
        t.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 1),
            ('TOPPADDING', (0,0), (-1,-1), 1),
        ]))
        story.append(t)
        for b in bullets:
            story.append(Paragraph(f"&bull; {b}", bullet_style))
        story.append(Spacer(1, 3))
        
    # Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceAfter=4))
    
    skills_data = [
        [Paragraph("<b>Languages:</b>", item_title_style), Paragraph("Java, Python, JavaScript, SQL", body_style)],
        [Paragraph("<b>Web Development:</b>", item_title_style), Paragraph("HTML5, CSS3, React.js, Node.js, Express.js, Next.js, Spring Boot", body_style)],
        [Paragraph("<b>Databases:</b>", item_title_style), Paragraph("MySQL, MongoDB, PostgreSQL, SQLite", body_style)],
        [Paragraph("<b>Tools & Platforms:</b>", item_title_style), Paragraph("Git, GitHub, Postman, Netlify, Vercel, Render, Power BI", body_style)],
        [Paragraph("<b>Others:</b>", item_title_style), Paragraph("DSA, RESTful APIs, Machine Learning, Data Analysis (Pandas, NumPy, Scikit-learn), AI Applications", body_style)]
    ]
    t_skills = Table(skills_data, colWidths=[125, 407])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(t_skills)
    story.append(Spacer(1, 4))
    
    # Education
    story.append(Paragraph("EDUCATION", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceAfter=4))
    
    edu_t1_data = [
        [Paragraph("<b>Savitribai Phule Pune University (SPPU)</b>", item_title_style), Paragraph("Pune, India", ParagraphStyle('R1', parent=item_meta_style, alignment=TA_RIGHT))],
        [Paragraph("<i>B.E. in Artificial Intelligence & Data Science | <b>CGPA: 8.62</b></i>", item_meta_style), Paragraph("Nov 2022 – Jul 2026", ParagraphStyle('R2', parent=item_meta_style, alignment=TA_RIGHT))]
    ]
    t_edu1 = Table(edu_t1_data, colWidths=[380, 152])
    t_edu1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_edu1)
    story.append(Paragraph("&bull; Hands-on experience in AI, ML, data analysis, web development through projects, internships, and coding competitions.", bullet_style))
    story.append(Spacer(1, 3))
    
    edu_t2_data = [
        [Paragraph("<b>Annasaheb Waghire College, Otur</b>", item_title_style), Paragraph("Maharashtra, India", ParagraphStyle('R1', parent=item_meta_style, alignment=TA_RIGHT))],
        [Paragraph("<i>Higher Secondary (Class XII) | <b>Percentage: 64.83%</b></i>", item_meta_style), Paragraph("Mar 2021 – Jun 2022", ParagraphStyle('R2', parent=item_meta_style, alignment=TA_RIGHT))]
    ]
    t_edu2 = Table(edu_t2_data, colWidths=[380, 152])
    t_edu2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_edu2)
    story.append(Spacer(1, 4))
    
    # Projects
    story.append(Paragraph("PROJECTS", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceAfter=4))
    
    projects_list = [
        ("EduLeap AI | AI Assistant for Coaching Institutions", "Building", [
            "Built an intelligent educational ecosystem using vision-based multi-modal AI to extract timetable data from images and map course information to student preferences.",
            "Created an analytical dashboard tracking task completion with user authentication and export formatting (Excel/HD images)."
        ]),
        ("Centralized Health Card System (CHC) | Live Project", "Live", [
            "Engineered a secure, cloud-hosted platform to consolidate patient health records into digital profiles; deployed via Vercel with cross-device responsive UI."
        ]),
        ("E-Commerce Platform | Live Project", "Live", [
            "Built a full-stack e-commerce application with product browsing, cart, checkout, and real-time inventory management; deployed on Vercel."
        ]),
        ("Task Management System", "", [
            "Full-stack app with CRUD operations, secure RESTful API backend built using Spring Boot and MySQL for team task tracking."
        ]),
        ("Uber Ride Analysis | Data Analysis Project", "", [
            "Analyzed ride data to identify trends in frequency, customer behavior, and traffic; visualized peak hours and demand using Power BI heatmaps."
        ]),
        ("IoT Based Virtual Doctor", "", [
            "Designed a remote healthcare solution using IoT sensors to monitor patient vitals in real time and provide immediate health alerts."
        ]),
        ("Basti Ki Pathsala Foundation | NGO Website – Live", "Live", [
            "Designed a responsive, accessible frontend for a Pune-based NGO to boost digital outreach and community fundraising; hosted on Vercel."
        ]),
        ("Personal Portfolio Website | Live Project", "Live", [
            "Developed an interactive, responsive portfolio showcasing skills and projects with optimized asset loading; hosted on Render."
        ])
    ]
    
    for p_title, p_tag, bullets in projects_list:
        p_data = [[
            Paragraph(f"<b>{p_title}</b>", item_title_style),
            Paragraph(p_tag, ParagraphStyle('R1', parent=item_meta_style, alignment=TA_RIGHT))
        ]]
        t_p = Table(p_data, colWidths=[430, 102])
        t_p.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0), ('RIGHTPADDING', (0,0), (-1,-1), 0)]))
        story.append(t_p)
        for b in bullets:
            story.append(Paragraph(f"&bull; {b}", bullet_style))
        story.append(Spacer(1, 2))
        
    doc.build(story)
    print(f"Resume generated at {output_path}")

if __name__ == "__main__":
    public_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "frontend", "public"))
    os.makedirs(public_dir, exist_ok=True)
    out_file = os.path.join(public_dir, "Sarthak_Gite_Resume.pdf")
    create_resume_pdf(out_file)
    
    # Also render high-res PNG preview pages using PyMuPDF (fitz)
    try:
        import fitz
        doc = fitz.open(out_file)
        for i, page in enumerate(doc):
            pix = page.get_pixmap(dpi=150)
            png_out = os.path.join(public_dir, f"Sarthak_Gite_Resume_page_{i+1}.png")
            pix.save(png_out)
            print(f"Generated preview image: {png_out}")
    except Exception as e:
        print("PNG preview rendering error:", e)
