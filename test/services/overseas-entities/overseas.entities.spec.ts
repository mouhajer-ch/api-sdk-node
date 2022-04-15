import { describe } from "mocha";
import { expect } from "chai";
import sinon from "sinon";

import * as mockValues from "./overseas.entities.mock";
import { OverseasEntityCreated, OverseasEntityService } from "../../../src/services/overseas-entities";
import Resource, { ApiErrorResponse } from "../../../src/services/resource";
import { mapOverseasEntity } from "../../../src/services/overseas-entities/mapping";

describe("OverseasEntityService Tests suite", () => {
    beforeEach(() => {
        sinon.reset();
        sinon.restore();
    });

    afterEach(done => {
        sinon.reset();
        sinon.restore();
        done();
    });

    it("should return object Id for postOverseasEntity method", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPostOverseasEntityResponse[201]);
        const oeService = new OverseasEntityService(mockValues.requestClient);
        const data = (await oeService.postOverseasEntity(
            mockValues.TRANSACTION_ID,
            mockValues.OVERSEAS_ENTITY_OBJECT_MOCK
        )) as Resource<OverseasEntityCreated>;

        expect(data.httpStatusCode).to.equal(201);
        expect(data.resource.id).to.equal(mockValues.mockOverseasEntityCreatedResource.id);
    });

    it("should return error 401 (Unauthorised) for postOverseasEntity method", async () => {
        sinon.stub(mockValues.requestClient, "httpPost").resolves(mockValues.mockPostOverseasEntityResponse[401]);

        const oeService = new OverseasEntityService(mockValues.requestClient);
        const data = await oeService.postOverseasEntity(mockValues.TRANSACTION_ID, {}) as ApiErrorResponse;

        expect(data.httpStatusCode).to.equal(401);
        expect(data.errors[0]).to.equal(mockValues.UNAUTHORISED);
    });
});

describe("Mapping OverseasEntity Tests suite", () => {
    it("should return OverseasEntity object from mapOverseasEntity method", async () => {
        const data = mapOverseasEntity({
            presenter: mockValues.PRESENTER_OBJECT_MOCK,
            entity: mockValues.ENTITY_OBJECT_MOCK
        });

        expect(data).to.deep.equal(mockValues.OVERSEAS_ENTITY_OBJECT_MOCK);
    });
});