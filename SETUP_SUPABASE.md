# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 접속하여 계정 생성 또는 로그인
2. 새 프로젝트 생성
3. 프로젝트 이름과 데이터베이스 비밀번호 설정
4. 리전 선택 (권장: 서울)
5. 프로젝트 생성 완료 대기

## 2. 환경 변수 설정

프로젝트가 생성되면 다음 정보를 찾을 수 있습니다:
- Project URL (Supabase URL)
- API Key (anon/public)

프로젝트 루트에 `.env.local` 파일을 생성하고 다음과 같이 설정합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

예시:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 3. 데이터베이스 테이블 생성

### 옵션 A: SQL 에디터 사용 (권장)

1. Supabase 대시보드에서 "SQL Editor" 탭 열기
2. "New Query" 클릭
3. 다음 SQL 쿼리 복사 후 실행:

```sql
-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS posts_created_at_idx ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS comments_post_id_idx ON comments(post_id);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Enable read access for all users" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON posts
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for all users" ON posts
  FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable delete for all users" ON comments
  FOR DELETE USING (true);
```

### 옵션 B: CLI 사용

터미널에서 다음 명령어 실행:

```bash
supabase db push --linked
```

또는 `supabase/migrations/001_create_tables.sql` 파일의 내용을 SQL 에디터에 붙여넣기

## 4. Row Level Security (RLS) 정책 확인

1. Supabase 대시보드에서 "Authentication" → "Policies" 탭 확인
2. posts와 comments 테이블에 다음 정책이 있어야 합니다:
   - SELECT (모두 허용)
   - INSERT (모두 허용)
   - UPDATE (모두 허용 - posts만)
   - DELETE (모두 허용)

## 5. 개발 서버 재시작

```bash
npm run dev
```

## 6. 테스트

1. 브라우저에서 http://localhost:3000 접속
2. "새 글 쓰기" 버튼 클릭하여 게시글 작성
3. Supabase 대시보시에서 "Table Editor" → "posts" 확인
4. 작성한 게시글이 데이터베이스에 저장되었는지 확인

## 문제 해결

### "Module not found: @supabase/supabase-js"
```bash
npm install @supabase/supabase-js
```

### 환경 변수를 찾을 수 없음
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- `NEXT_PUBLIC_SUPABASE_URL`과 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 확인
- 개발 서버 재시작

### RLS 정책 오류
- Supabase 대시보드에서 테이블의 "Auth" 탭 확인
- RLS가 활성화되어 있는지 확인
- 정책이 정확히 설정되어 있는지 확인

### 데이터베이스 연결 오류
- 환경 변수의 URL과 키가 정확한지 확인
- Supabase 프로젝트가 "Active" 상태인지 확인
- 네트워크 연결 확인

## 유용한 링크

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase JavaScript 라이브러리](https://supabase.com/docs/reference/javascript)
- [Row Level Security (RLS)](https://supabase.com/docs/guides/auth/row-level-security)
