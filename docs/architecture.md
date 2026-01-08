# Architektura — Facebook Clone

## 1. Cel projektu
Projekt edukacyjny typu „Facebook clone”, którego celem jest:
- prezentacja architektury aplikacji webowej
- pokazanie pracy z backendem w Java + Spring Boot
- integracja z frontendem w React
- praca z relacyjną bazą danych (MySQL)
- zastosowanie dobrych praktyk (warstwy, testy, Docker)

Projekt nie jest pełną kopią Facebooka — skupia się na kluczowych funkcjach
i jakości kodu.

---

## 2. Stack technologiczny

### Backend
- Java
- Spring Boot
- Spring Web (REST API)
- Spring Security (JWT)
- Spring Data JPA (Hibernate)
- MySQL
- Liquibase

### Frontend
- React (Vite)
- HTML5
- CSS3
- JavaScript (ES6+)

### Testy
- JUnit 5
- Mockito

### Infrastruktura
- Docker
- Docker Compose

---

## 3. Moduły aplikacji (backend)

- **Auth**
    - rejestracja
    - logowanie
    - JWT

- **User**
    - profil użytkownika
    - podstawowe dane

- **Post**
    - tworzenie postów
    - edycja
    - usuwanie

- **Comment**
    - komentarze do postów

- **Reaction**
    - polubienia (like)

- **Friendship**
    - zaproszenia do znajomych
    - akceptacja / odrzucenie

- **Feed**
    - strumień postów użytkownika
    - posty znajomych
    - sortowanie po dacie

---

## 4. Warstwy architektury backendu

Backend oparty jest o klasyczną architekturę warstwową:

- **Controller**
    - REST API
    - walidacja danych wejściowych

- **Service**
    - logika biznesowa
    - reguły aplikacji

- **Repository**
    - dostęp do bazy danych
    - JPA / Hibernate

- **Domain**
    - encje
    - relacje między encjami

- **DTO**
    - obiekty transferowe
    - komunikacja API ↔ frontend

---

## 5. Model domeny (wysoki poziom)

### User
- id
- email
- password
- createdAt

### Post
- id
- author (User)
- content
- createdAt

### Comment
- id
- post (Post)
- author (User)
- content
- createdAt

### Reaction
- id
- post (Post)
- user (User)
- type (LIKE)

### Friendship
- id
- requester (User)
- receiver (User)
- status (PENDING / ACCEPTED)

---

## 6. Główne przepływy aplikacji

### Rejestracja i logowanie
1. Użytkownik wysyła dane do API
2. Backend waliduje dane
3. Hasło jest haszowane
4. Generowany jest JWT
5. Frontend zapisuje token

---

### Dodanie posta
1. Użytkownik wysyła treść posta
2. Backend zapisuje post w bazie
3. Post pojawia się w feedzie

---

### Feed użytkownika
- własne posty
- posty znajomych
- sortowanie po dacie malejąco
- paginacja

---

## 7. Decyzje architektoniczne

- REST API zamiast GraphQL (prostota)
- JWT do autoryzacji
- Oddzielny frontend i backend
- Docker do uruchamiania środowiska
- Liquibase do wersjonowania bazy danych