import axios, { AxiosResponse } from "axios";
import { XMLParser } from 'fast-xml-parser';
import iconv from 'iconv-lite';
import util from 'util';

import OpendataUtil from "./opendata-util";

type Ret_SupportProjectApi_SuccessResponseType = {
    currentCount: number,
    data: Array<SupportProjectApi_SuccessResponseType>
}

type SupportProjectApi_SuccessResponseType = {
  aply_excl_trgt_ctnt: string | null; // 신청 제외 대상 내용
  aply_mthd_eml_rcpt_istc: string | null; // 이메일 접수 방식
  aply_mthd_etc_istc: string | null; // 기타 접수 방식
  aply_mthd_fax_rcpt_istc: string | null; // 팩스 접수 방식
  aply_mthd_onli_rcpt_istc: string | null; // 온라인 접수 방식
  aply_mthd_pssr_rcpt_istc: string | null; // 우편 접수 방식
  aply_mthd_vst_rcpt_istc: string | null; // 방문 접수 방식
  aply_trgt: string; // 신청 대상
  aply_trgt_ctnt: string; // 신청 대상 내용
  biz_aply_url: string | null; // 사업 신청 URL
  biz_enyy: string; // 사업 경영 연한
  biz_gdnc_url: string; // 사업 안내 URL
  biz_pbanc_nm: string; // 사업 공고명
  biz_prch_dprt_nm: string; // 사업 주관 부서명
  biz_trgt_age: string; // 사업 대상 연령
  detl_pg_url: string; // 상세 페이지 URL
  id: number; // 고유 ID
  intg_pbanc_biz_nm: string; // 통합공고 사업명
  intg_pbanc_yn: string; // 통합공고 여부
  pbanc_ctnt: string; // 공고 내용
  pbanc_ntrp_nm: string; // 공고 기업명
  pbanc_rcpt_bgng_dt: string; // 접수 시작일 (YYYYMMDD)
  pbanc_rcpt_end_dt: string; // 접수 종료일 (YYYYMMDD)
  pbanc_sn: number; // 공고 일련번호
  prch_cnpl_no: string; // 연락처
  prfn_matr: string | null; // 제출 서류
  rcrt_prgs_yn: string; // 모집 진행 여부
  sprv_inst: string; // 주관 기관
  supt_biz_clsfc: string; // 지원사업 분류
  supt_regin: string; // 지원 지역
};

type Ret_IntegratedApi_SuccessResponseType = {
    currentCount: number,
    data: Array<IntegratedApi_SuccessResponseType>
}

type IntegratedApi_SuccessResponseType = {
  biz_category_cd: string; // 사업 카테고리 코드
  biz_supt_bdgt_info: string; // 예산현황 및 지원규모
  biz_supt_ctnt: string; // 지원 내용
  biz_supt_trgt_info: string; // 지원 대상 정보
  biz_yr: number; // 사업 연도
  detl_pg_url: string; // 상세 페이지 URL
  id: number; // 고유 ID
  supt_biz_chrct: string; // 지원사업 특성
  supt_biz_intrd_info: string; // 지원사업 소개
  supt_biz_titl_nm: string; // 지원사업 제목
};


type LoanAPI_SuccessResponseType  = {
  seq: number;
  finprdnm: string; // 금융상품명
  lnlmt: number; // 대출한도
  lnlmt1000abnml: string;
  lnlmt2000abnml: string;
  lnlmt3000abnml: string;
  lnlmt5000abnml: string;
  lnlmt10000abnml: string;
  irtCtg: string; // 금리 구분
  irt: string; // 금리
  maxtotlntrm: string; // 최대 총 대출기간
  maxdfrmtrm: string; // 최대 거치기간
  maxrdpttrm: string; // 최대 상환기간
  rdptmthd: string; // 상환 방법
  usge: string; // 용도
  trgt: string; // 대상
  instCtg: string; // 기관 구분
  ofrinstnm: string; // 제공 기관명
  rsdAreaPamtEqltIstm: string;
  suprtgtdtlcond: string; // 지원 대상 상세 조건
  age: string; // 나이 조건
  age39blw: string;
  age40abnml: string;
  age60abnml: string;
  incm: string; // 소득 조건
  incmcndy: string;
  incmcndn: string;
  incmcnd: string;
  rsdarea: string; // 거주 지역
  crdtsc: string; // 신용 점수 조건
  crdtsc1: string;
  crdtsc2: string;
  crdtsc3: string;
  crdtsc4: string;
  crdtsc5: string;
  crdtsc6: string;
  crdtsc7: string;
  crdtsc8: string;
  crdtsc9: string;
  crdtsc0: string;
  anin: string;
  housholdcnt: string;
  housar: string;
  lntgthous: string;
  rfrccnpl: string; // 참조 연락처
  grninst: string; // 보증 기관
  jnmthd: string; // 접수 방법
  rpymdcfe: string; // 상환 수수료
  lnicdcst: string; // 대출 비용
  ovitryr: string; // 초과 이자율
  prftaddirtcond: string; // 추가 혜택 조건
  etcrefsbjc: string; // 기타 참고사항
  hdlinst: string; // 주관 기관
  cnpl: string; // 연락처
  rltsite: string; // 관련 사이트
  crdtsc15: string;
  crdtsc60: string;
  tgtFltr: string; // 대상 필터
  hdlinstdtlvw: string; // 주관 기관 상세 보기
  prdCtg: string; // 상품 카테고리
  prdoprprid: string; // 상품 운영 기간
  kinfaprdyn: string; // 기간 무관 여부
  kinfaprdetc: string; // 기간 무관 상세
}; 

type ServiceErrorResponse = {
  OpenAPI_ServiceResponse: {
    cmmMsgHeader: {
      errMsg: string; // 오류 메시지
      returnAuthMsg: string; // 인증 관련 메시지
      returnReasonCode: number; // 사유 코드
    };
  };
};

type SupportProjectApiResponse =
    | Ret_SupportProjectApi_SuccessResponseType  // 실제 성공 데이터 타입
    | ServiceErrorResponse;  // 실페 오류 타입

type IntegratedApiResponse =
    | Ret_IntegratedApi_SuccessResponseType  // 실제 성공 데이터 타입
    | ServiceErrorResponse;  // 실페 오류 타입

type LoanApiResponse =
    | LoanAPI_SuccessResponseType // 실제 성공 데이터 타입
    | ServiceErrorResponse; // 실페 오류 타입

export class OpenAPIClass {
    private serviceKey: string;

    /**
    * OpenAPI 인스턴스를 생성합니다.
    * @param serviceKey 공공데이터 포털에서 발급받은 서비스 키
    */
    constructor(serviceKey: string) {
        this.serviceKey = serviceKey;
    }

    /**
     * 지원사업 공고 정보를 조회합니다.
     * @param {string>} supt_biz_clsfc 지원 분야(안 적어도 됨)
     * @returns {Promise<SupportProjectApiResponse>} 지원사업 공고 정보
     */
    async getSupportBizInfoList(supt_biz_clsfc: string = ""):Promise<SupportProjectApiResponse> {
        const { yyyymmdd } = OpendataUtil.getKoreanDateInfo();
        const url = `https://apis.data.go.kr/B552735/kisedKstartupService01/getAnnouncementInformation01?serviceKey=${this.serviceKey}&page=1&perPage=10000&cond[supt_regin::LIKE]=${supt_biz_clsfc}&cond[pbanc_rcpt_bgng_dt::GTE]=${yyyymmdd}&cond[rcrt_prgs_yn::EQ]=Y&returnType=json`;
        return this.fetchAndExtract(url);
    }

    /**
     * 통합공고 지원사업 정보
     * @returns {Promise<IntegratedApiResponse>} 통합공고 지원사업 정보
     */

    async getIntegratedSupportInfoList():Promise<IntegratedApiResponse> {
        const { year } = OpendataUtil.getKoreanDateInfo();
        const url = `https://apis.data.go.kr/B552735/kisedKstartupService01/getBusinessInformation01?serviceKey=${this.serviceKey}&page=1&perPage=10000&returnType=json&cond[biz_yr::EQ]=${year}`;
        return this.fetchAndExtract(url);
    }

    /**
     * 서민 대출상품한눈에 정보조회 서비스
     * @returns {Promise<LoanApiResponse>} 서민 대출상품한눈에 정보조회 서비스
     */
    async getAffordableLoanInfoList(): Promise<LoanApiResponse> {
        const url =
            'https://apis.data.go.kr/B553701/LoanProductSearchingInfo/LoanProductSearchingInfo/getLoanProductSearchingInfo' +
            `?serviceKey=${this.serviceKey}&pageNo=1&numOfRows=10000&type=json`;
        return this._fetchAndExtract(url);
    }

    /**
     * 공통 fetch 및 응답 처리 로직
     * @param {string} url 요청 URL
     * @returns {Promise<any>} 응답 데이터
     */
    private async fetchAndExtract(url: string) {
        try {
            const res = await axios.get(url);
            if (res?.data?.data) {
              return res.data.data;   
            }

            const parser = new XMLParser({
                ignoreAttributes: false,
                trimValues: true,
            });

            const xmlObj = parser.parse(res.data);
            throw new Error(util.inspect(xmlObj, { depth: null }));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Network Error: ${error.message}`);
            }
            throw error;
        }
    }

    /**
     * 공통 fetch 및 응답 처리 로직 (EUC-KR 대응)
     * @param url 요청 URL
     * @returns 응답 데이터
     */
    private async _fetchAndExtract<T = any>(url: string): Promise<T> {
        try {
            const res = await axios.get(url, {
                responseType: 'arraybuffer', // 원본 바이트
                decompress: true,
                timeout: 30000,
                headers: { Accept: 'application/json, text/plain, */*' },
                // transformResponse: [(d) => d], // (선택) axios의 자동 파싱 완전 차단
            });

            const buf = Buffer.from(res.data);
            const contentType = String(res.headers['content-type'] || '').toLowerCase();

            // 1) 우선 UTF-8로 JSON 파싱 시도
            let textUtf8 = null;
            try {
                textUtf8 = buf.toString('utf-8');
                return OpendataUtil.unwrapIfWrapped(JSON.parse(textUtf8));
            } catch (_) {
            // 실패 시 다음 단계로
            }

            // 2) EUC-KR(CP949)로 디코딩 후 JSON 파싱 재시도
            let textKr = null;
            try {
                const charset =
                    (contentType.match(/charset=([^;]+)/i)?.[1] || '').toLowerCase();
                const guess = charset && charset !== 'utf-8' ? charset : 'euc-kr';
                textKr = iconv.decode(buf, guess);
                return OpendataUtil.unwrapIfWrapped(JSON.parse(textKr));
            } catch (_) {
            // 여전히 실패면 XML일 가능성
            }

            // 3) XML → 객체 변환 시도 (UTF-8 / EUC-KR 모두 시도)
            const parser = new XMLParser({
                ignoreAttributes: false,
                trimValues: true,
            });

            // 3-a) UTF-8로 XML 파싱
            try {
                const xmlObj = parser.parse(textUtf8 ?? buf.toString('utf-8'));
                return OpendataUtil.extractFromXml(xmlObj);
            } catch (_) {
                // 3-b) EUC-KR로 XML 파싱
                const xmlObj = parser.parse(textKr ?? iconv.decode(buf, 'euc-kr'));
                return OpendataUtil.extractFromXml(xmlObj);
            }
        } catch (error) {
            if (axios.isAxiosError?.(error)) {
                const status = error.response?.status;
                throw new Error(`Network Error${status ? ` (${status})` : ''}: ${error.message}`);
            }
            throw error;
        }
    }
}
