# 기술스택

---

1. Nest.JS with Typescript
2. GraphQL
3. TypeORM
4. PostgreSQL

# 실행 방법

---

Pre-requirement : node.js, npm

- Node.JS(& NPM) Installer : https://nodejs.org/en/



1. To Access GraphQl Playground, open browser and go to http://localhost:4000

- Note that your server is running at port 4000
- Your database is running at port 5432 (DEFAUTL ID AND PASSWORD IS 'postgres')


# 구현 API 목록

---

### Queries

- findSurveys - 전체 설문 리스트 조회
- fetchSurveyById - 설문 아이디로 설문 조회
- findQuestions - 전체 질문 리스트 조회
- findQuestionById - 질문 아이디로 질문 조회
- findAnswers - 전체 답변 리스트 조회

### Mutations

- createSurvey - 설문 생성
- updateSurvey - 설문 수정
- removeSurvey - 설문 삭제
- createQuestion - 질문 생성
- updateSurvey - 질문 수정
- removeSurvey - 질문 삭제
- createAnswer - 답변 생성
- updateAnswer - 답변 수정
- removeAnswer - 답변 삭제

# ERD

---

![image](https://user-images.githubusercontent.com/104415354/212230313-afcd1ea9-5b7f-40d5-97bc-5bdf2be8f6b8.png)

