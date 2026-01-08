# Projekt bazy danych — Facebook Clone (MySQL)

## 1. Założenia
- relacyjna baza danych (MySQL)
- normalizacja danych
- klucze obce dla relacji
- indeksy pod najczęstsze zapytania
- przygotowanie pod Liquibase

---

## 2. Tabele

### users
| pole | typ | uwagi |
|----|----|----|
| id | BIGINT | PK |
| email | VARCHAR(255) | UNIQUE |
| password | VARCHAR(255) | |
| created_at | DATETIME | |

Indeksy:
- UNIQUE(email)

---

### posts
| pole | typ | uwagi |
|----|----|----|
| id | BIGINT | PK |
| author_id | BIGINT | FK → users.id |
| content | TEXT | |
| created_at | DATETIME | |

Indeksy:
- INDEX(author_id)
- INDEX(created_at)

---

### comments
| pole | typ | uwagi |
|----|----|----|
| id | BIGINT | PK |
| post_id | BIGINT | FK → posts.id |
| author_id | BIGINT | FK → users.id |
| content | TEXT | |
| created_at | DATETIME | |

Indeksy:
- INDEX(post_id)
- INDEX(author_id)

---

### reactions
| pole | typ | uwagi |
|----|----|----|
| id | BIGINT | PK |
| post_id | BIGINT | FK → posts.id |
| user_id | BIGINT | FK → users.id |
| type | VARCHAR(20) | LIKE |
| created_at | DATETIME | |

Indeksy:
- UNIQUE(post_id, user_id)
- INDEX(post_id)

---

### friendships
| pole | typ | uwagi |
|----|----|----|
| id | BIGINT | PK |
| requester_id | BIGINT | FK → users.id |
| receiver_id | BIGINT | FK → users.id |
| status | VARCHAR(20) | PENDING / ACCEPTED |
| created_at | DATETIME | |

Indeksy:
- UNIQUE(requester_id, receiver_id)
- INDEX(status)

---

## 3. Relacje

- users 1:N posts
- users 1:N comments
- posts 1:N comments
- users N:N users (friendships)
- users 1:N reactions
- posts 1:N reactions

---

## 4. Decyzje projektowe

- BIGINT jako PK (przygotowanie pod skalowanie)
- relacje realizowane przez FK
- tabele audytowane przez created_at
- indeksy pod feed i komentarze
- brak soft-delete na tym etapie

---

## 5. Kolejność migracji (Liquibase)

1. users
2. posts
3. comments
4. reactions
5. friendships