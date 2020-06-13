import traceable from "."

const identity = <T>(value: T) => value

const WHATEVER = identity
describe(`${traceable.name}`, () => {
	test(`Displays "tracer name" in test error`, () => {
		const baseObject = { key: "value" }
		const tracerObjectName = "tracer_object_name"
		const tracer = traceable(baseObject, tracerObjectName)

		try {
			expect(tracer).toBe("something_that_will_make_the_est_fail")
			fail(`Test should have failed at this point`)
		} catch (e) {
			expect(e.toString()).toContain(tracerObjectName)
		}
	})

	test(`Returns a copy of the original object`, () => {
		const baseObject = { key: "value" }
		const tracer = traceable(baseObject, WHATEVER("tracer_name"))

		expect(tracer).not.toBe(baseObject)
	})

	test(`Object properties are still accessible`, () => {
		const baseObject = { key: "value" }
		const tracer = traceable(baseObject, WHATEVER("tracer_name"))

		expect(tracer.key).toBe(baseObject.key)
	})

	test(`Object methods are still working`, () => {
		class Num {
			private value: number

			constructor(value: number) {
				this.value = value
			}

			by(multiplier: number) {
				return this.value * multiplier
			}
		}
		const num = traceable(new Num(5), WHATEVER("tracer_name"))

		expect(num.by(5)).toBe(25)
	})

	test(`Can be initialized with a name only (placeholder)`, () => {
		const tracer_name = "tracer_name_only"
		const tracer = traceable(tracer_name)
		expect(tracer).toEqual(tracer_name)
	})
})
