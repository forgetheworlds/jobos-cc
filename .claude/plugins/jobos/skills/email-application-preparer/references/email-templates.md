# Email Templates — Application by Email

## Subject Line Patterns

### Standard Format
```
Application for [Position Title] - [Candidate Name]
```

### With Job ID
```
Application for [Position Title] (Job ID: [ID]) - [Candidate Name]
```

### Institution-Specific
```
Application: [Position Title] - [Institution Name] - [Candidate Name]
```

### Referral (if applicable)
```
Application for [Position Title] (Referred by [Name]) - [Candidate Name]
```

## Body Structure

### Salutation
Formal and specific:
- "Dear Hiring Manager," (if unknown)
- "Dear [Name]," (if specific contact known)
- "Dear [Title] Search Committee," (for academic positions)
- "To the [Department] Faculty Search Committee,"

### Opening Paragraph
State purpose and specific position:
```
I am writing to express my interest in the [Position Title] role at [Institution Name],
as advertised on [Source]. With my background in [relevant field/qualification],
I believe I would be a strong candidate for this position.
```

### Middle Paragraph(s)
Highlight 2-3 key qualifications aligned with job requirements:
```
My experience includes [specific achievement or responsibility]. In my current role
as [Current Position] at [Current Institution], I [specific accomplishment relevant
to the role]. I am particularly drawn to this position because [specific connection
to institution or mission].

[Optional second paragraph: additional qualification or achievement]
```

### Closing Paragraph
Call to action and next steps:
```
I have attached my resume and [other documents] for your review. I would welcome
the opportunity to discuss how my qualifications align with your needs. Thank you
for your consideration.
```

### Sign-Off
Professional closing:
- "Sincerely,"
- "Respectfully,"
- "Best regards,"

Followed by full name and contact information.

## Complete Template

```
[Salutation]

I am writing to express my interest in the [Position Title] role at
[Institution Name], as advertised on [Source]. With my background in
[relevant field/qualification], I believe I would be a strong candidate
for this position.

My experience includes [specific achievement or responsibility]. In my
current role as [Current Position] at [Current Institution], I [specific
accomplishment relevant to the role]. I am particularly drawn to this
position because [specific connection to institution or mission].

[Optional: I have [number] years of experience in [field], with particular
strengths in [skill 1], [skill 2], and [skill 3].]

I have attached my resume [and cover letter/teaching philosophy/diversity
statement] for your review. I would welcome the opportunity to discuss how
my qualifications align with your needs. Thank you for your consideration.

[Sign-Off],

[Candidate Name]
[Candidate Title]
[Email]
[Phone]
[LinkedIn/Portfolio URL - optional]
```

## Attachment Manifest

List all attachments clearly:

```
Attachments:
1. Resume - [filename.pdf]
2. Cover Letter - [filename.pdf]
3. [Document Name] - [filename.pdf]
```

## Institution-Specific Variations

### Higher Education / Academic
- More formal tone
- Reference teaching, research, or service experience
- Mention alignment with institutional mission
- Attach CV instead of resume if required
- May include teaching philosophy or diversity statement

### Corporate / Industry
- Concise, results-oriented
- Emphasize achievements and metrics
- Focus on business impact
- Resume and cover letter typically sufficient

### Non-Profit / Organization
- Emphasize mission alignment
- Highlight relevant experience or passion
- Reference specific programs or initiatives
- May include portfolio or work samples

## Email Draft File Format

Save to `data/outputs/email_application/[slug]_EMAIL.md`:

```markdown
# Email Application: [Position Title] at [Institution]

## To
[recipient_email@example.com]

## Subject
Application for [Position Title] - [Candidate Name]

## Body
[Salutation]

[Full email body text]

[Sign-Off],

[Candidate Name]
[Candidate Contact Information]

## Attachments
1. [Absolute path to resume.pdf]
2. [Absolute path to cover_letter.pdf]
3. [Absolute path to custom_doc.pdf] (if applicable)

## Instructions
1. Copy subject line to email subject field
2. Copy body text to email body
3. Attach all listed files
4. Review for accuracy
5. Send email
6. Update job status to "submitted"
```

## Quality Checks

Before finalizing email draft:
- [ ] Spelling and grammar correct
- [ ] Institution name spelled correctly
- [ ] Position title matches job posting exactly
- [ ] Contact information accurate and current
- [ ] All attachments exist at specified paths
- [ ] Tone appropriate for institution type
- [ ] Email recipient address is valid
- [ ] Email is concise (under 300 words preferred)
