import axios, { AxiosResponse } from "axios";
import OpendataUtil from "./opendata-util";

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
     * @param {string} supt_biz_clsfc 지원 분야
     * @param {string} supt_regin 지역명
     * @param {string} biz_enyy 창업 기간(7년미만,5년미만,3년미만,2년미만,1년미만,예비창업자)
     * @returns {Promise<any>} 지원사업 공고 정보
     */
    async getSupportBizInfoList(supt_biz_clsfc: string, supt_regin: string, biz_enyy: string) {
        const { yyyymmdd } = OpendataUtil.getKoreanDateInfo();
        const url = `https://apis.data.go.kr/B552735/kisedKstartupService01/getAnnouncementInformation01?serviceKey=${this.serviceKey}&page=1&perPage=1000&cond[intg_pbanc_yn::EQ]=N&cond[supt_biz_clsfc::LIKE]=${supt_biz_clsfc}&cond[supt_regin::LIKE]=${supt_regin}&cond[pbanc_rcpt_bgng_dt::GTE]=${yyyymmdd}&cond[biz_enyy::LIKE]=${biz_enyy}&returnType=json`;
        return this.fetchAndExtract(url);
    }

    /**
     * 공통 fetch 및 응답 처리 로직
     * @param {string} url 요청 URL
     * @returns {Promise<any>} 응답 데이터
     */
    async fetchAndExtract(url: string) {
        try {
            const res = await axios.get(url);
            return res.data.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Network Error: ${error.message}`);
            }
            throw error;
        }
    }
}
