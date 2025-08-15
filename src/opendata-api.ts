import axios, { AxiosResponse } from "axios";
import { XMLParser } from 'fast-xml-parser';
import iconv from 'iconv-lite';
import util from 'util';

import OpendataUtil from "./opendata-util";

declare type Ret_SupportProjectApi_SuccessResponseType = {
  /** 현재 카운트 */
  currentCount: number;
  /** 지원사업 공고 데이터 배열 */
  data: Array<SupportProjectApi_SuccessResponseType>;
};

declare type SupportProjectApi_SuccessResponseType = {
  /** 신청 제외 대상 내용 */
  aply_excl_trgt_ctnt: string | null;
  /** 이메일 접수 방식 */
  aply_mthd_eml_rcpt_istc: string | null;
  /** 기타 접수 방식 */
  aply_mthd_etc_istc: string | null;
  /** 팩스 접수 방식 */
  aply_mthd_fax_rcpt_istc: string | null;
  /** 온라인 접수 방식 */
  aply_mthd_onli_rcpt_istc: string | null;
  /** 우편 접수 방식 */
  aply_mthd_pssr_rcpt_istc: string | null;
  /** 방문 접수 방식 */
  aply_mthd_vst_rcpt_istc: string | null;
  /** 신청 대상 */
  aply_trgt: string;
  /** 신청 대상 내용 */
  aply_trgt_ctnt: string;
  /** 사업 신청 URL */
  biz_aply_url: string | null;
  /** 사업 경영 연한 */
  biz_enyy: string;
  /** 사업 안내 URL */
  biz_gdnc_url: string;
  /** 사업 공고명 */
  biz_pbanc_nm: string;
  /** 사업 주관 부서명 */
  biz_prch_dprt_nm: string;
  /** 사업 대상 연령 */
  biz_trgt_age: string;
  /** 상세 페이지 URL */
  detl_pg_url: string;
  /** 고유 ID */
  id: number;
  /** 통합공고 사업명 */
  intg_pbanc_biz_nm: string;
  /** 통합공고 여부 */
  intg_pbanc_yn: string;
  /** 공고 내용 */
  pbanc_ctnt: string;
  /** 공고 기업명 */
  pbanc_ntrp_nm: string;
  /** 접수 시작일 (YYYYMMDD) */
  pbanc_rcpt_bgng_dt: string;
  /** 접수 종료일 (YYYYMMDD) */
  pbanc_rcpt_end_dt: string;
  /** 공고 일련번호 */
  pbanc_sn: number;
  /** 연락처 */
  prch_cnpl_no: string;
  /** 제출 서류 */
  prfn_matr: string | null;
  /** 모집 진행 여부 */
  rcrt_prgs_yn: string;
  /** 주관 기관 */
  sprv_inst: string;
  /** 지원사업 분류 */
  supt_biz_clsfc: string;
  /** 지원 지역 */
  supt_regin: string;
};


declare type Ret_IntegratedApi_SuccessResponseType = {
  /** 현재 카운트 */
  currentCount: number;
  /** 통합공고 지원사업 데이터 배열 */
  data: Array<IntegratedApi_SuccessResponseType>;
};

declare type IntegratedApi_SuccessResponseType = {
  /** 사업 카테고리 코드 */
  biz_category_cd: string;
  /** 예산현황 및 지원규모 */
  biz_supt_bdgt_info: string;
  /** 지원 내용 */
  biz_supt_ctnt: string;
  /** 지원 대상 정보 */
  biz_supt_trgt_info: string;
  /** 사업 연도 */
  biz_yr: number;
  /** 상세 페이지 URL */
  detl_pg_url: string;
  /** 고유 ID */
  id: number;
  /** 지원사업 특성 */
  supt_biz_chrct: string;
  /** 지원사업 소개 */
  supt_biz_intrd_info: string;
  /** 지원사업 제목 */
  supt_biz_titl_nm: string;
};

declare type LoanAPI_SuccessResponseType = {
  /** 상품 순번 */
  seq: number;
  /** 금융상품명 */
  finprdnm: string;
  /** 대출한도 */
  lnlmt: number;
  lnlmt1000abnml: string;
  lnlmt2000abnml: string;
  lnlmt3000abnml: string;
  lnlmt5000abnml: string;
  lnlmt10000abnml: string;
  /** 금리 구분 */
  irtCtg: string;
  /** 금리 */
  irt: string;
  /** 최대 총 대출기간 */
  maxtotlntrm: string;
  /** 최대 거치기간 */
  maxdfrmtrm: string;
  /** 최대 상환기간 */
  maxrdpttrm: string;
  /** 상환 방법 */
  rdptmthd: string;
  /** 용도 */
  usge: string;
  /** 대상 */
  trgt: string;
  /** 기관 구분 */
  instCtg: string;
  /** 제공 기관명 */
  ofrinstnm: string;
  rsdAreaPamtEqltIstm: string;
  /** 지원 대상 상세 조건 */
  suprtgtdtlcond: string;
  /** 나이 조건 */
  age: string;
  age39blw: string;
  age40abnml: string;
  age60abnml: string;
  /** 소득 조건 */
  incm: string;
  incmcndy: string;
  incmcndn: string;
  incmcnd: string;
  /** 거주 지역 */
  rsdarea: string;
  /** 신용 점수 조건 */
  crdtsc: string;
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
  /** 참조 연락처 */
  rfrccnpl: string;
  /** 보증 기관 */
  grninst: string;
  /** 접수 방법 */
  jnmthd: string;
  /** 상환 수수료 */
  rpymdcfe: string;
  /** 대출 비용 */
  lnicdcst: string;
  /** 초과 이자율 */
  ovitryr: string;
  /** 추가 혜택 조건 */
  prftaddirtcond: string;
  /** 기타 참고사항 */
  etcrefsbjc: string;
  /** 주관 기관 */
  hdlinst: string;
  /** 연락처 */
  cnpl: string;
  /** 관련 사이트 */
  rltsite: string;
  crdtsc15: string;
  crdtsc60: string;
  /** 대상 필터 */
  tgtFltr: string;
  /** 주관 기관 상세 보기 */
  hdlinstdtlvw: string;
  /** 상품 카테고리 */
  prdCtg: string;
  /** 상품 운영 기간 */
  prdoprprid: string;
  /** 기간 무관 여부 */
  kinfaprdyn: string;
  /** 기간 무관 상세 */
  kinfaprdetc: string;
};

declare type ServiceErrorResponse = {
  /** 공공데이터포털 OpenAPI 오류 응답 */
  OpenAPI_ServiceResponse: {
    cmmMsgHeader: {
      /** 오류 메시지 */
      errMsg: string;
      /** 인증 관련 메시지 */
      returnAuthMsg: string;
      /** 사유 코드 */
      returnReasonCode: number;
    };
  };
};

declare type SupportProjectApiResponse =
  | Ret_SupportProjectApi_SuccessResponseType
  | ServiceErrorResponse;

declare type IntegratedApiResponse =
  | Ret_IntegratedApi_SuccessResponseType
  | ServiceErrorResponse;

declare type LoanApiResponse =
  | LoanAPI_SuccessResponseType
  | ServiceErrorResponse;

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
     *
     * @param {string} [supt_biz_clsfc] 지원 분야 (선택 사항, 미입력 시 전체 조회)
     * @returns {Promise<SupportProjectApiResponse>} 지원사업 공고 정보
     *
     * @typedef {Object} SupportProjectApiResponse
     * @property {number} currentCount 현재 카운트
     * @property {SupportProjectApi_SuccessResponseType[]} data 지원사업 공고 목록
     *
     * @typedef {Object} SupportProjectApi_SuccessResponseType
     * @property {string|null} aply_excl_trgt_ctnt 신청 제외 대상 내용
     * @property {string|null} aply_mthd_eml_rcpt_istc 이메일 접수 방식
     * @property {string|null} aply_mthd_etc_istc 기타 접수 방식
     * @property {string|null} aply_mthd_fax_rcpt_istc 팩스 접수 방식
     * @property {string|null} aply_mthd_onli_rcpt_istc 온라인 접수 방식
     * @property {string|null} aply_mthd_pssr_rcpt_istc 우편 접수 방식
     * @property {string|null} aply_mthd_vst_rcpt_istc 방문 접수 방식
     * @property {string} aply_trgt 신청 대상
     * @property {string} aply_trgt_ctnt 신청 대상 내용
     * @property {string|null} biz_aply_url 사업 신청 URL
     * @property {string} biz_enyy 사업 경영 연한
     * @property {string} biz_gdnc_url 사업 안내 URL
     * @property {string} biz_pbanc_nm 사업 공고명
     * @property {string} biz_prch_dprt_nm 사업 주관 부서명
     * @property {string} biz_trgt_age 사업 대상 연령
     * @property {string} detl_pg_url 상세 페이지 URL
     * @property {number} id 고유 ID
     * @property {string} intg_pbanc_biz_nm 통합공고 사업명
     * @property {string} intg_pbanc_yn 통합공고 여부
     * @property {string} pbanc_ctnt 공고 내용
     * @property {string} pbanc_ntrp_nm 공고 기업명
     * @property {string} pbanc_rcpt_bgng_dt 접수 시작일 (YYYYMMDD)
     * @property {string} pbanc_rcpt_end_dt 접수 종료일 (YYYYMMDD)
     * @property {number} pbanc_sn 공고 일련번호
     * @property {string} prch_cnpl_no 연락처
     * @property {string|null} prfn_matr 제출 서류
     * @property {string} rcrt_prgs_yn 모집 진행 여부
     * @property {string} sprv_inst 주관 기관
     * @property {string} supt_biz_clsfc 지원사업 분류
     * @property {string} supt_regin 지원 지역
     */
    async getSupportBizInfoList(supt_biz_clsfc: string = ""):Promise<SupportProjectApiResponse> {
        const { yyyymmdd } = OpendataUtil.getKoreanDateInfo();
        const url = `https://apis.data.go.kr/B552735/kisedKstartupService01/getAnnouncementInformation01?serviceKey=${this.serviceKey}&page=1&perPage=10000&cond[supt_regin::LIKE]=${supt_biz_clsfc}&cond[pbanc_rcpt_bgng_dt::GTE]=${yyyymmdd}&cond[rcrt_prgs_yn::EQ]=Y&returnType=json`;
        return this.fetchAndExtract(url);
    }

    /**
     * 통합공고 지원사업 정보를 조회합니다.
     *
     * @returns {Promise<IntegratedApiResponse>} 통합공고 지원사업 정보
     *
     * @typedef {Object} IntegratedApiResponse
     * @property {number} currentCount 현재 카운트
     * @property {IntegratedApi_SuccessResponseType[]} data 지원사업 목록
     *
     * @typedef {Object} IntegratedApi_SuccessResponseType
     * @property {string} biz_category_cd 사업 카테고리 코드
     * @property {string} biz_supt_bdgt_info 예산현황 및 지원규모
     * @property {string} biz_supt_ctnt 지원 내용
     * @property {string} biz_supt_trgt_info 지원 대상 정보
     * @property {number} biz_yr 사업 연도
     * @property {string} detl_pg_url 상세 페이지 URL
     * @property {number} id 고유 ID
     * @property {string} supt_biz_chrct 지원사업 특성
     * @property {string} supt_biz_intrd_info 지원사업 소개
     * @property {string} supt_biz_titl_nm 지원사업 제목
     */

    async getIntegratedSupportInfoList():Promise<IntegratedApiResponse> {
        const { year } = OpendataUtil.getKoreanDateInfo();
        const url = `https://apis.data.go.kr/B552735/kisedKstartupService01/getBusinessInformation01?serviceKey=${this.serviceKey}&page=1&perPage=10000&returnType=json&cond[biz_yr::EQ]=${year}`;
        return this.fetchAndExtract(url);
    }

   /**
     * 서민 대출상품한눈에 정보조회 서비스
     * @returns {Promise<LoanApiResponse[]>} 서민 대출상품 목록
     * 
     * @typedef {Object} LoanApiResponse
     * @property {number} seq
     * @property {string} finprdnm 금융상품명
     * @property {number} lnlmt 대출한도
     * @property {string} lnlmt1000abnml
     * @property {string} lnlmt2000abnml
     * @property {string} lnlmt3000abnml
     * @property {string} lnlmt5000abnml
     * @property {string} lnlmt10000abnml
     * @property {string} irtCtg 금리 구분
     * @property {string} irt 금리
     * @property {string} maxtotlntrm 최대 총 대출기간
     * @property {string} maxdfrmtrm 최대 거치기간
     * @property {string} maxrdpttrm 최대 상환기간
     * @property {string} rdptmthd 상환 방법
     * @property {string} usge 용도
     * @property {string} trgt 대상
     * @property {string} instCtg 기관 구분
     * @property {string} ofrinstnm 제공 기관명
     * @property {string} rsdAreaPamtEqltIstm
     * @property {string} suprtgtdtlcond 지원 대상 상세 조건
     * @property {string} age 나이 조건
     * @property {string} age39blw
     * @property {string} age40abnml
     * @property {string} age60abnml
     * @property {string} incm 소득 조건
     * @property {string} incmcndy
     * @property {string} incmcndn
     * @property {string} incmcnd
     * @property {string} rsdarea 거주 지역
     * @property {string} crdtsc 신용 점수 조건
     * @property {string} crdtsc1
     * @property {string} crdtsc2
     * @property {string} crdtsc3
     * @property {string} crdtsc4
     * @property {string} crdtsc5
     * @property {string} crdtsc6
     * @property {string} crdtsc7
     * @property {string} crdtsc8
     * @property {string} crdtsc9
     * @property {string} crdtsc0
     * @property {string} anin
     * @property {string} housholdcnt
     * @property {string} housar
     * @property {string} lntgthous
     * @property {string} rfrccnpl 참조 연락처
     * @property {string} grninst 보증 기관
     * @property {string} jnmthd 접수 방법
     * @property {string} rpymdcfe 상환 수수료
     * @property {string} lnicdcst 대출 비용
     * @property {string} ovitryr 초과 이자율
     * @property {string} prftaddirtcond 추가 혜택 조건
     * @property {string} etcrefsbjc 기타 참고사항
     * @property {string} hdlinst 주관 기관
     * @property {string} cnpl 연락처
     * @property {string} rltsite 관련 사이트
     * @property {string} crdtsc15
     * @property {string} crdtsc60
     * @property {string} tgtFltr 대상 필터
     * @property {string} hdlinstdtlvw 주관 기관 상세 보기
     * @property {string} prdCtg 상품 카테고리
     * @property {string} prdoprprid 상품 운영 기간
     * @property {string} kinfaprdyn 기간 무관 여부
     * @property {string} kinfaprdetc 기간 무관 상세
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
