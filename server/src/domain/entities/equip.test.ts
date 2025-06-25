import { describe, it, expect } from "vitest";
import { Equipment } from "./equip";

describe("equipment domain tests", () => {
    it("should be able to create an new equipment", () => {
        const equipment = new Equipment({
            name: "equipment-name",
            image: "image",
            stock: 5,
            price: 54,
            description: "equipment-descritpion",
        });

        expect(equipment).toHaveProperty("id");
        console.log(equipment);
    });

    it("should throw an invalid price error if price is lower than zero", () => {
        expect(() => {
            new Equipment({
                name: "equipment-name",
                image: "image",
                stock: 5,
                price: -2,
                description: "equipment-descritpion",
            });
        }).toThrow();
    });
});
