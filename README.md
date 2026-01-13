# 📝 OpenAPIClass

> 공공데이터포털의 창업 지원사업 공고 데이터를 손쉽게 조회할 수 있는 TypeScript 기반 API 클라이언트입니다.

---

<br><br>

## ✨ 특징

- 지원사업 공고 정보 조건별 조회 (지원 분야, 지역, 창업 연차 등)
- 한국 시간 기준 자동 필터링 (yyyymmdd)
- Axios 기반 HTTP 클라이언트 사용
- TypeScript 지원 및 타입 안정성 보장
- 요청 실패 시 명확한 예외 메시지 제공

---

<br><br>

## 📦 설치

```bash
npm install opendata-api
# 또는
yarn add opendata-api
```

<br><br>

## 🚀 사용예제
```ts
import { OpenAPIClass, OpendataUtil } from 'opendata-api'; // ESM
// or const { OpenAPIClass, OpendataUtil } = require('opendata-api'); // CommonJS

// API 키는 공공데이터 포털에서 발급받은 서비스 키를 입력하세요.
const opendata_api = new OpenAPIClass('YOUR_SERVICE_KEY');

async function main() {
  try {
    const supportBizInfoList = await opendata_api.getSupportBizInfoList();
    console.log('지원사업 공고 정보:', supportBizInfoList);

    const integratedSupportInfoList = await opendata_api.getIntegratedSupportInfoList();
    console.log('통합공고 지원사업 정보:', integratedSupportInfoList);

    const affordableLoanInfoList = await opendata_api.getAffordableLoanInfoList();
    console.log('서민 대출상품한눈에 정보:', affordableLoanInfoList);
  } catch (error) {
    console.error('API 호출 실패:', error.message);
  }
}

main();
```

<br><br>

## 📘 지원 메서드

<br>

### OpenAPIClass 클래스

#### 📌 지원 사업 정보

| 메서드 | 설명 |
|--------|------|
| `getSupportBizInfoList(supt_biz_clsfc?: string)` | 지원사업 공고 정보 조회 |
| `getIntegratedSupportInfoList()` | 통합공고 지원사업 정보 조회 |

#### 📌 지원 사업 정보

| 메서드 | 설명 |
|--------|------|
| `getAffordableLoanInfoList()` | 서민 대출상품한눈에 정보 조회 |


<br>

메서드 계속 추가 예정입니다!

<br><br>

## 🛠️ 요구 사항

- **Node.js 14 이상**  
  최신 Node.js 런타임 환경이 필요합니다.

- **API 키**  
  국토교통부 공공데이터 포털에서 발급받은 서비스 키를 사용해야 합니다.  
  👉 [공공데이터포털 바로가기](https://www.data.go.kr/)

<br><br>

## ❗ 예외 처리

모든 API 호출은 `try...catch` 구문을 통해 실패 시 명확한 예외 정보를 제공합니다.

- 오류 발생 시 `Error` 객체가 throw되며, `error.message`를 통해 상세 원인을 확인할 수 있습니다.

예외는 다음과 같은 경우에 발생할 수 있습니다:

- ❌ **잘못된 API 키**  
  인증되지 않은 키를 사용할 경우

- 🌐 **네트워크 오류**  
  서버 연결 실패, 응답 지연 등

- 🏢 **존재하지 않는 단지 코드**  
  유효하지 않은 단지 코드를 전달한 경우

- ⛔ **요청 제한 초과**  
  API 호출 횟수 제한을 초과했을 경우

<br><br>
