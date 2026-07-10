import os
import sys
import subprocess

# Ensure reportlab is installed
try:
    import reportlab
except ImportError:
    print("Installing reportlab library...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "reportlab"])
    import reportlab

from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def create_resume_pdf(output_path):
    # Setup document with 0.5 inch margins (36 points)
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    # Custom colors
    primary_color = colors.HexColor("#0f172a") # Slate 900
    secondary_color = colors.HexColor("#4f46e5") # Indigo 600
    text_color = colors.HexColor("#334155") # Slate 700
    heading_bg = colors.HexColor("#f1f5f9") # Slate 100
    
    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary_color,
        alignment=TA_LEFT
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=secondary_color,
        spaceAfter=6
    )
    
    contact_style = ParagraphStyle(
        'ContactInfo',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=text_color
    )
    
    section_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=14,
        textColor=primary_color,
        spaceBefore=10,
        spaceAfter=4
    )
    
    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=text_color,
        spaceAfter=4
    )
    
    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=text_color,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=3
    )
    
    item_title_style = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=primary_color
    )
    
    item_meta_style = ParagraphStyle(
        'ItemMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=12,
        textColor=text_color
    )
    
    story = []
    
    # ------------------ HEADER SECTION ------------------
    story.append(Paragraph("SARTHAK S. GITE", title_style))
    story.append(Paragraph("FULL STACK DEVELOPER & AI ENTHUSIAST", subtitle_style))
    
    contact_text = (
        "Balewadi, Pune (411045)  |  <b>Email:</b> sarthakgite006@gmail.com  |  "
        "<b>LinkedIn:</b> linkedin.com/in/sarthakgite06  |  <b>GitHub:</b> github.com/Sarthakgite06"
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#cbd5e1"), spaceAfter=10))
    
    # ------------------ SUMMARY ------------------
    story.append(Paragraph("SUMMARY", section_heading_style))
    summary_text = (
        "Passionate AI & Data Science student with hands-on experience in web development, data-driven solutions, "
        "and real-world projects like customer churn prediction and chatbot development. Known for blending "
        "problem-solving skills with creativity, I thrive on building efficient, user-focused solutions while "
        "continuously learning and adapting to new technologies."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 6))
    
    # ------------------ PROFESSIONAL EXPERIENCE ------------------
    story.append(Paragraph("PROFESSIONAL EXPERIENCE", section_heading_style))
    
    # NeuAi Labs
    exp_table_data1 = [
        [Paragraph("<b>NeuAi Labs</b>, Intern", item_title_style), 
         Paragraph("Dec 2024 - Jan 2025", ParagraphStyle('RightMeta', parent=item_meta_style, alignment=TA_RIGHT))]
    ]
    t1 = Table(exp_table_data1, colWidths=[380, 160])
    t1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t1)
    story.append(Spacer(1, 3))
    
    story.append(Paragraph("&bull; Developed a Customer Churn Prediction System using Python, machine learning models, and data preprocessing techniques to improve retention insights.", bullet_style))
    story.append(Paragraph("&bull; Performed data analysis and visualization with SQL/MongoDB and libraries like Pandas and Matplotlib for actionable business insights.", bullet_style))
    story.append(Paragraph("&bull; Optimized model performance through feature engineering and hyperparameter tuning, achieving improved prediction accuracy.", bullet_style))
    story.append(Spacer(1, 6))
    
    # Codec Technologies
    exp_table_data2 = [
        [Paragraph("<b>Codec Technologies</b>, Project Head Intern", item_title_style), 
         Paragraph("Mar 2025 - Apr 2025", ParagraphStyle('RightMeta', parent=item_meta_style, alignment=TA_RIGHT))]
    ]
    t2 = Table(exp_table_data2, colWidths=[380, 160])
    t2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t2)
    story.append(Spacer(1, 3))
    
    story.append(Paragraph("&bull; Led and managed the end-to-end execution of assigned technology projects, ensuring timely delivery, effective team collaboration, and alignment with organizational goals.", bullet_style))
    story.append(Paragraph("&bull; Overseeing project planning, resource allocation, progress tracking, and stakeholder communication.", bullet_style))
    story.append(Spacer(1, 6))
    
    # ------------------ TECHNICAL SKILLS ------------------
    story.append(Paragraph("TECHNICAL SKILLS", section_heading_style))
    skills_data = [
        [Paragraph("<b>Languages:</b>", item_title_style), Paragraph("Java, Python, JavaScript, SQL", body_style)],
        [Paragraph("<b>Web Development:</b>", item_title_style), Paragraph("HTML5, CSS3, React.js, Node.js, Express.js, Spring Boot", body_style)],
        [Paragraph("<b>Databases:</b>", item_title_style), Paragraph("MySQL, MongoDB", body_style)],
        [Paragraph("<b>Tools & Platforms:</b>", item_title_style), Paragraph("Git, GitHub, Postman, Netlify, Docker", body_style)],
        [Paragraph("<b>Others:</b>", item_title_style), Paragraph("Data Structures & Algorithms, RESTful APIs, Machine Learning, Data Analysis", body_style)]
    ]
    t_skills = Table(skills_data, colWidths=[120, 420])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(t_skills)
    story.append(Spacer(1, 6))
    
    # ------------------ EDUCATION ------------------
    story.append(Paragraph("EDUCATION", section_heading_style))
    
    # Degree
    edu_table_data1 = [
        [Paragraph("<b>B.E. in Artificial Intelligence & Data Science</b>", item_title_style), 
         Paragraph("Nov 2022 - Present", ParagraphStyle('RightMeta', parent=item_meta_style, alignment=TA_RIGHT))]
    ]
    edu_t1 = Table(edu_table_data1, colWidths=[380, 160])
    edu_t1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu_t1)
    story.append(Paragraph("Savitribai Phule Pune University (SPPU)  ||  <b>CGPA - 8.88 / 9.60</b>", item_meta_style))
    story.append(Paragraph("&bull; Focus on core AI, machine learning, and data analysis techniques. Gained hands-on experience through academic projects, internships, and coding competitions.", bullet_style))
    story.append(Spacer(1, 4))
    
    # School
    edu_table_data2 = [
        [Paragraph("<b>Higher Secondary (Class XII)</b>", item_title_style), 
         Paragraph("Mar 2021 - Jun 2022", ParagraphStyle('RightMeta', parent=item_meta_style, alignment=TA_RIGHT))]
    ]
    edu_t2 = Table(edu_table_data2, colWidths=[380, 160])
    edu_t2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu_t2)
    story.append(Paragraph("Annasaheb Waghire College, Otur  ||  <b>Percentage: 64.83%</b>", item_meta_style))
    story.append(Spacer(1, 6))
    
    # ------------------ PROJECTS ------------------
    story.append(Paragraph("PROJECTS", section_heading_style))
    
    # IoT Virtual Doctor
    story.append(Paragraph("<b>IoT Based Virtual Doctor</b>", item_title_style))
    story.append(Paragraph("An intelligent remote healthcare solution designed to monitor vital health parameters in real time using IoT sensors and provide immediate feedback/alerts. Reduces physical doctor visits, facilitating chronic disease monitoring.", bullet_style))
    story.append(Spacer(1, 4))
    
    # Weather Dashboard
    story.append(Paragraph("<b>Weather Dashboard & Student Management System</b>", item_title_style))
    story.append(Paragraph("Developed full-stack interfaces with CRUD operations. Implemented RESTful API backend using Spring Boot, Hibernate, and MySQL/H2 for secure data storage and retrieval.", bullet_style))
    story.append(Spacer(1, 4))
    
    # Uber Ride Analysis
    story.append(Paragraph("<b>Uber Ride Analysis (Data Analysis Project)</b>", item_title_style))
    story.append(Paragraph("&bull; Analyzed Uber ride dataset to identify trends in ride frequency, customer behavior, and demand patterns.", bullet_style))
    story.append(Paragraph("&bull; Conducted data cleaning, processing, and exploratory data analysis (EDA) using Pandas and NumPy.", bullet_style))
    story.append(Paragraph("&bull; Visualized peak hours and location demand using Matplotlib, Seaborn heatmaps, and charts.", bullet_style))
    
    # Build document
    doc.build(story)
    print(f"Resume generated successfully at {output_path}!")

if __name__ == "__main__":
    public_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "frontend", "public"))
    os.makedirs(public_dir, exist_ok=True)
    out_file = os.path.join(public_dir, "Sarthak_Gite_Resume.pdf")
    create_resume_pdf(out_file)
