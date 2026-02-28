# Beta ERP — Tester Quickstart (1 page)

Last updated: 2026-02-28

## 1) What is this beta?
You are testing the **ERP (beta)** used to create missions (dossiers), add services, and generate invoices.

- Beta URL: https://beta-erp.eliteparistransfer.com
- Access: **invite-only** (no public signup)
- Data: **demo / anonymized** (do not input real client personal data)

## 2) How to log in
1. You will receive an email invite.
2. Click the link and set your password (if requested).
3. Log in on the beta URL.

If login fails:
- Try incognito/private mode
- Disable browser extensions that block scripts
- Report the error (see §6)

## 3) What to test (core flow)
Please try to complete this exact scenario:

### A) Create a mission (Dossier)
- Go to **Dossiers**
- Create a new dossier
- Set a clear title (example: "Beta Mission - Test")

### B) Add services to the dossier
- Inside the dossier, click **Nouveau service**
- Create 2-3 services:
  - 1 TRANSFER (Origin -> Destination, date/time, pax, price)
  - 1 DISPO (start/end time) and verify duration calculation
- Edit a price inline in the table (click on "Prix HT")

### C) Create an invoice
- Fill **Ref. externe / PO** (any value like "PO-BETA-001")
- Click **-> Creer la facture**
- Confirm if you see a warning about price = 0 (do not ignore; fix price)

### D) Optional: Detach recovery
- Detach a service by mistake
- Verify you can recover it via **Recemment detaches -> Rattacher**

## 4) What NOT to do
- Do not enter real passenger names, phone numbers, emails, flight numbers.
- Do not use real payment data.
- Do not test with large volumes (keep it small, 1-3 dossiers).

## 5) Expected rough edges
Because it is beta:
- Some UI labels may change.
- Some workflows are incomplete (SaaS multi-tenant and billing are planned, not active).
- Performance may vary.

## 6) How to report an issue (the right way)
When something looks wrong, send:

1. **What you did** (steps 1->2->3)
2. **What you expected** vs **what happened**
3. Screenshot (if possible)
4. Browser + device (Chrome/Windows, Safari/iPhone, etc.)
5. Time of issue (local time)
6. If shown, include **ID support / request_id** from the error toast

Preferred channel: WhatsApp / email (as provided by the owner).

## 7) Success criteria for this beta
- You can complete: Dossier -> Services -> Invoice without help
- No data leakage (you only see your demo data)
- Errors are understandable and actionable
