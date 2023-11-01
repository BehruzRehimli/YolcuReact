import {useField} from "formik"


export default function Select({label,options,spClass,...props}){

    const [field,meta,helpers]=useField(props)
    return(
        <label className="form-control">
            <div className={spClass} style={{marginBottom:"10px"}}>{label}</div>
            <select className={"form-control "} {...props} {...field}>
                {
                    options.map(x=>{
                        return <option key={x} value={x}>{x}</option>
                    })
                }
            </select>
        </label>
    )

}