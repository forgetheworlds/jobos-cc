# Email Application Templates

## Subject Line Patterns

### Standard Format
```
Application for [Position Title] — [Candidate Name]
```

**Examples**:
- `Application for Director of Student Success — Mohamed Sambul`
- `Application for Academic Advisor — Mohamed Sambul`
- `Application for Assistant Professor of Education — Mohamed Sambul`

### Variations

**If Job ID is Referenced**:
```
Application for [Position Title] (Job ID: [number]) — [Candidate Name]
```

**If Specific Committee is Named**:
```
Application for [Position Title] — [Committee Name] — [Candidate Name]
```

**If Referred by Someone**:
```
Application for [Position Title] — [Candidate Name] (Referred by [Name])
```

---

## Email Body Templates

### Template 1: Standard Search Committee (Most Common)

```
Dear Search Committee,

I am writing to apply for the [Position Title] position at [Institution Name].

With [number] years of experience in [field/area], I have [specific achievement or responsibility]. My background in [relevant area] aligns well with the priorities outlined in the posting.

Please find the following materials attached:
• Cover Letter
• Resume
[• Additional Document 1]
[• Additional Document 2]

Thank you for your consideration. I look forward to hearing from you.

[Your Name]
[Your Email] | [Your Phone]
```

### Template 2: Named Contact Person

```
Dear Dr. [Last Name] / Dear Mr./Ms. [Last Name],

I am writing to apply for the [Position Title] position at [Institution Name].

I learned of this opportunity from [source if relevant]. With [number] years of experience in [field], I have [specific achievement]. My work in [relevant area] has prepared me well for the responsibilities described in the posting.

Please find the following materials attached:
• Cover Letter
• Resume
[• Additional Document 1]
[• Additional Document 2]

Thank you for your time and consideration.

Sincerely,

[Your Name]
[Your Email] | [Your Phone]
```

### Template 3: Faculty Position

```
Dear Members of the Search Committee,

I am writing to apply for the [Position Title] position in the [Department Name] at [Institution Name].

My teaching and research focus on [area/s]. I have [number] years of experience in [specialty], with particular expertise in [specific area]. I am especially drawn to this position because of [specific program/initiative at the institution].

Please find the following materials attached:
• Cover Letter
• Curriculum Vitae
• Teaching Philosophy
[• Research Statement]
[• Diversity Statement]
[• Sample Syllabi]

Thank you for considering my application. I would welcome the opportunity to discuss how I might contribute to [Department Name].

[Your Name]
[Your Email] | [Your Phone]
[Your Website/Portfolio URL if applicable]
```

### Template 4: Administrative/Staff Position

```
Dear Search Committee,

I am writing to apply for the [Position Title] position at [Institution Name].

I bring [number] years of experience in higher education [area/field]. In my current role as [Current Position], I have [specific responsibility or achievement]. I am excited about the opportunity to contribute to [specific program or initiative mentioned in posting].

Please find the following materials attached:
• Cover Letter
• Resume
[• Additional Document 1]
[• Additional Document 2]

Thank you for your consideration.

[Your Name]
[Your Email] | [Your Phone]
[LinkedIn Profile URL if applicable]
```

### Template 5: With Reference to Conversation

```
Dear [Name],

Thank you for speaking with me yesterday about the [Position Title] position at [Institution Name].

Our conversation reinforced my interest in this opportunity. As I mentioned, I have [number] years of experience in [relevant area], and I believe my background in [specific area] would allow me to contribute to [specific goal or initiative].

Please find the following materials attached:
• Cover Letter
• Resume
[• Additional Document 1]
[• Additional Document 2]

I look forward to potential next steps in the search process.

Best regards,

[Your Name]
[Your Email] | [Your Phone]
```

### Template 6: Responding to Specific Job Posting Requirements

```
Dear Search Committee,

I am writing to apply for the [Position Title] position at [Institution Name].

Your posting seeks a candidate with [key requirement 1], [key requirement 2], and [key requirement 3]. My experience includes:

• [Evidence of requirement 1]: [brief detail]
• [Evidence of requirement 2]: [brief detail]
• [Evidence of requirement 3]: [brief detail]

Please find the following materials attached:
• Cover Letter
• Resume
[• Additional Document 1]
[• Additional Document 2]

Thank you for your consideration.

[Your Name]
[Your Email] | [Your Phone]
```

---

## Attachment Order

**Standard Order** (for most applications):
1. Cover Letter
2. Resume or CV
3. Additional required documents (teaching philosophy, diversity statement, etc.)
4. Reference list (if requested and available)

**Faculty Position Order**:
1. Cover Letter
2. Curriculum Vitae
3. Teaching Philosophy
4. Research Statement (if required)
5. Diversity Statement (if required)
6. Sample Syllabi or Teaching Evaluations (if required)
7. Reference List (if requested)

**Administrative Position Order**:
1. Cover Letter
2. Resume
3. Reference List (if requested)
4. Additional materials (if specified)

---

## Attachment Manifest Format

The attachment manifest is a JSON file that tracks:

```json
{
  "job_id": "uuid",
  "created_at": "2025-03-28T10:30:00Z",
  "to_email": "careers@university.edu",
  "subject": "Application for Director of Student Success — Mohamed Sambul",
  "attachments": [
    {
      "order": 1,
      "filename": "cover_letter_mohamed_sambul.pdf",
      "type": "cover_letter",
      "description": "Cover Letter"
    },
    {
      "order": 2,
      "filename": "resume_mohamed_sambul.pdf",
      "type": "resume",
      "description": "Resume"
    },
    {
      "order": 3,
      "filename": "teaching_philosophy_mohamed_sambul.pdf",
      "type": "teaching_philosophy",
      "description": "Teaching Philosophy"
    }
  ],
  "total_attachments": 3
}
```

---

## Banned Content

**Never include in email applications**:

### Overused/Empty Phrases
- "I'm passionate about education"
- "I've always wanted to work at"
- "I believe that education is the key to"
- "I am a hard worker"
- "I am a team player"

### Informal Elements
- Emoji (🎓, 📚, etc.)
- Multiple exclamation points!!!
- ALL CAPS for emphasis
- Text-speak abbreviations (thx, pls, etc.)
- Casual sign-offs ("Best," "Cheers,")

### Demanding Language
- "I will call to follow up"
- "I expect to hear from you by"
- "Please respond within"
- "I require an answer by"

### Over-Follow-Up
- "I'll check back in a few days"
- "When can I expect a response?"
- "I'm eager to discuss this opportunity immediately"

---

## Tone Guidelines

### Higher Education Email Tone

**Be**:
- Professional but approachable
- Respectful of search committee time
- Clear and concise
- Specific about your qualifications
- Confident but not arrogant

**Avoid**:
- Jargon or buzzwords
- Vague statements ("I'm a great fit")
- Overfamiliarity
- Demands or expectations
- Over-explanation (email is not the cover letter)

### Length Guidelines

- **Subject line**: Under 70 characters
- **Email body**: 100-150 words (not including attachments list)
- **Greeting**: Formal ("Dear Search Committee,")
- **Closing**: Standard ("Thank you for your consideration.")

### When in Doubt

- Keep it shorter rather than longer
- Let your cover letter speak for itself
- Use standard templates as a starting point
- Ask: "Is this easy to read and understand?"
- Remember: The email is the wrapper, not the application itself

---

## Email Review Checklist

Before sending, verify:

- [ ] Recipient email address is correct
- [ ] Subject line is clear and professional
- [ ] Greeting is appropriate for the recipient
- [ ] Position title and institution are correct
- [ ] Brief pitch is accurate and relevant
- [ ] Attachment list is complete and in order
- [ ] Closing is professional
- [ ] Signature includes name and contact info
- [ ] All attached files are in correct format (PDF preferred)
- [ ] Filenames are professional (no "final_final_v3.pdf")
- [ ] Tone is appropriate for higher education
- [ ] No banned content or informal language
- [ ] Email is concise (under 150 words body)
