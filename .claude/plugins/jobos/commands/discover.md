---
name: jobos-find
description: Search for higher education job openings across LinkedIn, Indeed, Google Jobs, and university websites. Finds jobs matching your profile and saves them for review.
usage: /jobos-find [--source SOURCE] [--query QUERY] [--location LOCATION] [--all]
examples:
  - /jobos-find --source linkedin --query "student success"
  - /jobos-find --location "Boston, MA"
  - /jobos-find --all
author: JobOS-CC
version: 1.0.0
---

# /jobos-find — Find Job Openings

Search for jobs across multiple sources and add them to the processing pipeline.

## Usage

```
/jobos-find [--source SOURCE] [--query QUERY] [--location LOCATION] [--all]
```

## Options

- `--source SOURCE`: Limit to specific source (linkedin, indeed, google_jobs, institutional)
- `--query QUERY`: Use specific search query instead of preferences
- `--location LOCATION`: Use specific location instead of preferences
- `--all`: Search all enabled sources with all configured queries

## Default Behavior

If no options provided:
- Use all sources enabled in `search_preferences.yml`
- Use all query sets from preferences
- Use all locations from preferences

## Examples

Search specific source and query:
```bash
/jobos-find --source linkedin --query "director of student affairs"
```

Search all sources for specific location:
```bash
/jobos-find --location "Remote"
```

Full discovery with all preferences:
```bash
/jobos-find --all
```

## Workflow

1. Load discovery-scout agent
2. Load search preferences from `state/candidate/search_preferences.yml`
3. For each source/query/location combination:
   - Execute source-specific discovery
   - Extract structured job data
   - Normalize fields
4. Run deduplication (exact match, fuzzy match, external redirect)
5. Write unique jobs to `state/queues/inbound_jobs.jsonl`
6. Display discovery summary:
   - Jobs found per source
   - Duplicates removed
   - Total new jobs added
   - Any errors or issues

## Output

Jobs written to `state/queues/inbound_jobs.jsonl` with all required fields populated.
