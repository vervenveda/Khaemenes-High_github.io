# Science 9 Repair 04 — Reversible Course Progress Synchronization

Upload this package from the repository root while preserving folders.

## Files Replaced

The Unit 00 controller and all Unit 01–12 controllers.

## Repair

- Completing every required lesson, investigation, assessment, project, and reflection adds the unit to the root `completedUnits` record.
- Removing or resetting any required item removes the unit from the root record.
- Reconciliation runs after every local unit-state change.
- Reconciliation also runs whenever a unit page opens, correcting stale records from earlier controller versions.
- `courseSequenceComplete` is recalculated from all thirteen units every time.

## Preserved

- Existing localStorage keys and saved student work
- Questions, answers, thresholds, attempts, and explanations
- Printing and JSON exports
- Unit 01–02 portal-navigation repair
- Shared light/dark theme loader
- All curriculum content
