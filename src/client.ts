import IHttpClient from "./http/http-client";
import CompanyOfficersService from "./services/company-officers/service";
import CompanyProfileService from "./services/company-profile/service";
import CompanyPscService from "./services/company-psc/service";
import { LateFilingPenaltyService } from "./services/lfp";
import { BasketService, OrderService, CertificateService, CertifiedCopiesService, MidService } from "./services/order/";
import { PaymentService } from "./services/payment/";

/**
 * ApiClient is the class that all service objects hang off.
 */
export default class ApiClient {
  public readonly lateFilingPenalties: LateFilingPenaltyService;
  public readonly companyOfficers: CompanyOfficersService;
  public readonly companyProfile: CompanyProfileService;
   public  readonly  companyPsc : CompanyPscService ;
  public readonly certificate: CertificateService;
  public readonly certifiedCopies: CertifiedCopiesService;
  public readonly basket: BasketService;
  public readonly payment: PaymentService;
  public readonly order: OrderService;
  public readonly mid : MidService;

  constructor (readonly apiClient: IHttpClient, readonly accountClient: IHttpClient) {
      // services on the api domain using the apiClient
      this.lateFilingPenalties = new LateFilingPenaltyService(apiClient);
      this.companyOfficers = new CompanyOfficersService(apiClient);
      this.companyProfile = new CompanyProfileService(apiClient);
      this.companyPsc = new CompanyPscService(apiClient);
      this.certificate = new CertificateService(apiClient);
      this.certifiedCopies = new CertifiedCopiesService(apiClient);
      this.basket = new BasketService(apiClient);
      this.payment = new PaymentService(apiClient); // TODO split payments url/domain into a separate config item and http client
      this.order = new OrderService(apiClient);
      this.mid = new MidService(apiClient);
      // service on the account/identity domain using the accountClient
      // e.g. user profile service can be added here when required
  }
}
