import {useField} from "formik"

export default function Text({label,spClass,...props}){
    const [field,meta,helpers]=useField(props)
    return(
        <label className="form-control">
            <div className={spClass} style={{marginBottom:"10px"}}>{label}</div>
            <input className="form-control" {...props} {...field} />
        </label>
    )
}