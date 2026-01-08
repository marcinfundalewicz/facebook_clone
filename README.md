# Facebook Clone — projekt edukacyjny

Aplikacja webowa typu social network tworzona w celach nauki nowoczesnego fullstacku.

**Stack technologiczny:**
Java, Spring Boot, Hibernate, MySQL, Liquibase, React (SPA), Docker.

## Zakres MVP

- rejestracja i logowanie użytkowników (JWT)
- profil użytkownika
- posty
- komentarze
- reakcje (lajki)
- znajomi (zaproszenia / akceptacja)
- feed (wpisy własne + znajomych)

## Architektura

- Backend: Spring Boot — REST API (`/api/**`)
- Frontend: React SPA (Vite)
- Baza danych: MySQL (zarządzana przez Liquibase)
- Dokumentacja: katalog `docs`

## Struktura projektu

- `backend` — REST API + logika domenowa
- `frontend` — aplikacja SPA (React)
- `docs` — dokumentacja, diagramy, decyzje architektoniczne

## Status projektu

Projekt w trakcie realizacji — aktualnie ukończony etap architektury, bazy danych oraz kontraktu API.