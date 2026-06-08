# People Deduplication Report
**Date:** 2026-06-08
**Trigger:** Jason identified duplicate entries on Monday IAP board

## What was done

### Local People files
- Merge groups identified: 24
- Files merged and deleted: see list below

### Merge groups
- **Ahana_Delwar.md** ← merged from: Ahana.md
- **Alexander_Layendecker.md** ← merged from: Alex_Layendecker.md, Alex.md
- **Alvin_Graylin.md** ← merged from: Alvin_W_Graylin.md
- **Aswad_Martin.md** ← merged from: Aswad_Martin__personal_.md
- **Brendon_Kenny.md** ← merged from: Brendon.md
- **Carl_Weir.md** ← merged from: Carl_Weir__personal_.md
- **Diego_Gaitan.md** ← merged from: D__Gaitan.md
- **Franco_Borelli.md** ← merged from: Fran_Borelli.md
- **Gemma_Richardson.md** ← merged from: Gemma.md, Gemma_Richardson_AMI_Specialty.md
- **Gene_Lim.md** ← merged from: Gene.md
- **Grant_Blaisdell.md** ← merged from: Grant_Blaisdell_CopernicSpace.md
- **Gustavo_Blanco.md** ← merged from: Gustavo.md
- **James_Farrell.md** ← merged from: James.md, James_Farell.md
- **Joao_Ruivo.md** ← merged from: Jo_o_Ruivo.md
- **Jose_Reis_Santos.md** ← merged from: Jos__Reis_Santos.md
- **Karen_Elliott.md** ← merged from: Dr_Karen_Elliott.md
- **Magnus_Bj_rkman.md** ← merged from: Magnus.md
- **Maria_Milagros_Santamaria.md** ← merged from: Maria_Milagros_Santamaria__Milli_.md, Mili_Santamaria.md, Milli.md
- **Pam_Bristow.md** ← merged from: Pam.md
- **Sanjeev_sanjvma.md** ← merged from: Sanjeev.md
- **Uma_Sinha.md** ← merged from: Uma.md
- **James_Farell.md** ← merged from: James_Farrell.md, James.md
- **Simon_Gonzalez_Moreno.md** ← merged from: Simon_AMI_Specialty.md, Gonz.md
- **Diego_Gaitan.md** ← merged from: D__Gaitan.md

### Ambiguous first-name-only files
- **MSS.md**: Full name not recoverable from file content. The Financologist founder. No matching full-name file found. Ambiguous — could be any person with initials MSS.
- **NJ.md**: First name initial NJ, last name Jackson given in file. No duplicate full-name file exists. Not ambiguous as a duplicate — unique person, just stored under initials.
- **JB.md**: Full name not in file. Internal team member. Could be multiple candidates. No matching full-name file found. Ambiguous.
- **M_Hamlin.md**: First initial M only, last name Hamlin. No matching full-name file. Not a duplicate of any existing file. Single-meeting contact from Jan 2026.
- **Tim.md**: Three distinct people: Tim at Althub (external partner), Tim Barrett (internal One 2b team, tim@one2b.io), Tim Mere (Stellenium, tim@stellenium.com). No merge warranted — all different people. Tim.md and Scott.md are both from Althub and appear in the same meeting (2026-04-23), so they are distinct individuals at the same company.
- **Michelle_F_Anthony.md**: Different people sharing the Anthony surname. Michelle F Anthony has a zmail address and US military/Camp Pendleton connection. Gabrielle Anthony is at Andwele Energy (gabrielle.anthony@andweleenergy.com). Both attended the same 2026-01-27 meeting, confirming they are distinct individuals.
- **Michal_Hali_Zebede.md**: Different person from Michal_Kakol.md. Michal Hali Zebede is a filmmaker (2026-02-24 meeting). Michal Kakol is a software developer with datasets (michal.szymon@gmail.com, 2026-02-25 meeting). No merge warranted.

### Monday.com IAP board
- Duplicates found and archived to Archive group
- See board: [12butterflies Monday IAP board](https://12butterflies.monday.com/boards/18415032975)

## Going forward — dedup protocol

**Rule:** One file per person. Canonical filename = Full_Name.md
- First-name-only files are banned — always resolve to full name on creation
- When Fireflies scrape creates a new file, check for existing file before writing
- Monday sync: match by email first, name second, never create if match found
