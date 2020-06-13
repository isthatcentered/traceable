import cloneDeep from "lodash.clonedeep"

const always = <T>(value: T) => () => value

function traceable<T extends object>(obj: T, description: string): T
function traceable<T extends object>(description: string): T
function traceable<T extends object>(
	objectOrDescription: T | string,
	description?: string,
): T {
	const clone = cloneDeep(objectOrDescription)

	return (Object.assign(clone, {
		toJSON: always(description || objectOrDescription),
	}) as any) as T
}

export default traceable
