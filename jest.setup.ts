import "@testing-library/jest-dom";
import fetchMock from "fetch-mock-jest";

fetchMock.mock("https://foodish-api.herokuapp.com/api/images/burger", 200);

jest.spyOn(window, "alert").mockImplementation(() => {});
