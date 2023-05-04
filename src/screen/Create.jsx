import style from './Create.module.css';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from 'moment';
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from '../components/Dropdown';
import { blood_group_options, citiesByState, guardian_label_options, idType_options, marital_status_options, religion_options, sex_options, stateArray } from '../data';

const validationSchema = yup.object().shape({
    name: yup.string().required(),
    dobOrAge: yup
        .mixed()
        .test(
        'dobOrAge',
        'Enter a valid date of birth or age in years',
        value => {
            const isAgeValid = /^\d+$/.test(value) && Number(value) > 0 && Number(value) < 120;
            const isDOBValid = /^\d{2}-\d{2}-\d{4}$/.test(value) && moment(value, 'DD-MM-YYYY', true).isValid();
            return isAgeValid || isDOBValid;
        },
        )
        .required('Date of Birth or Age is required'),
    sex: yup
        .string()
        .oneOf(['male', 'female', 'other'], 'Enter a valid sex')
        .required('Sex is required'),
    mobile: yup.mixed().test(
        'isValidMobile',
        'Please enter a valid Indian mobile number',
        (value) => {
            if (!value) {
                return true; // pass validation if value is null or undefined
            }
            return /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(value);
        }
    ).optional(),
    email: yup.string().email().optional(),
    id_type: yup.string().optional(),
    govt_id: yup.string().test('govt_id-test', 'Invalid Govt ID', function(value) {
        const idType = this.parent.id_type;
        if (idType === 'aadhar') {
        return /^[0-9]{12}$/.test(value);
        } else if (idType === 'pan') {
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
        } else {
        return true; // If no id_type selected, the validation is skipped
        }
    }),
    emergency_contact_number: yup.mixed().test(
        'isValidContactMobile',
        'Please enter a valid Indian emergency contact number',
        (value) => {
            if (!value) {
                return true; // pass validation if value is null or undefined
            }
            return /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(value);
        }
    ).optional(),
    guardian_label: yup.string().optional(),
    guardian_name: yup.string().test('guardian_name-test', 'Invalid guardian name', function(value) {
        const guardianLabel = this.parent.guardian_label;
        const options = ['parent', 'children', 'wife', 'brother', 'sister']
        if (options.includes(guardianLabel)) {
        return yup.string().required('Guardian name is required').isValidSync(value);
        } else {
        return true; // If no guardian_label selected, the validation is skipped
        }
    }),
    address: yup.string().optional(),
    state:yup.string().optional(),
    city:yup.string().optional(),
    occupation: yup.string().optional(),
    country: yup.string().required(),
    nationality: yup.string().required(),
    marital_status: yup.string().optional(),
    blood_group: yup.string().optional(),
    religion: yup.string().optional(),
    pincode: yup.mixed().test(
        'isValidPincode',
        'Invalid Pincode',
        (value) => {
            if (!value) {
                return true; // pass validation if value is null or undefined
            }
            return /^[1-9][0-9]{5}$/.test(value);
        }
    ).optional(),
});
export function Create() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
        defaultValues: {
        country: 'India',
        nationality: 'India'
        },
        resolver: yupResolver(validationSchema),
    });
    const selectedState = watch('state');
    const cities = citiesByState[selectedState] || [];
    const onSubmit = async(data) => {
        // console.log("onSubmit data: ",data);
        try {
            setLoading(true);
            const result = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/create`, data);
            setLoading(false);
            if(result.status === 201){
                navigate(-1);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            setError(error || error?.message);
        } 
    };  
    if(error){
        return <div>error:{error}</div>
    } 
    return (
    <>
        <h1 className={"App-heading"}>Onito Patient Form</h1>
        <form className={style.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
            <section className={style.personal_wrapper}>
                <h2 className={style.form_heading}>Personal Details</h2>
                <div className={style.personal_col1}>
                    <div className={''}>
                        <label className='pr'>Name<sup>*</sup></label>
                        <input 
                            type="text"
                            {...register("name")}
                            placeholder='Enter Name'
                        />
                    </div>
                    <div className='validation-error'>{errors.name && errors.name.message}</div>
                </div>
                <div className={style.personal_col2}>
                    <div className={''}>
                        <label className='dateOrAge pr'>Date of Birth or Age<sup>*</sup></label>
                        <input 
                            type="text"
                            {...register('dobOrAge')}
                            placeholder='DD-MM-YYYY or Age in Years'
                        />
                    </div>
                    <div className='validation-error'>{errors.dobOrAge && errors.dobOrAge.message}</div>
                </div>
                <div className={style.personal_col3}>
                    <div className={'col_sex_container'}>
                    <label className='pr'>Sex<sup>*</sup></label>
                    <Dropdown
                        name="sex"
                        options={sex_options}
                        defaultValue={""}
                        {...register('sex')}
                        onChange={(selectedOption) => {
                            setValue('sex', selectedOption?.value);
                        }}
                        placeholder={"Enter Sex"}
                    />
                    </div>
                    <div className='validation-error'>{errors.sex && errors.sex.message}</div>
                </div>
                <div className={style.personal_col4}>
                    <div className={''}>
                    <label className='pr'>Mobile</label>
                    <input 
                        type="text"
                        name="mobile"
                        placeholder='Enter Mobile'
                        {...register('mobile')}
                    />
                    </div>
                    <div className='validation-error'>{errors.mobile && errors.mobile.message}</div>
                </div>
                <div className={style.personal_col5}>
                    <div className={style.govtWrapper}>
                        <label className='pr'>Govt Issued ID</label>
                        <div className={style.govtInputWrapper}>
                            <Dropdown
                                name="id_type"
                                options={idType_options}
                                defaultValue={""}
                                {...register('id_type')}
                                onChange={(selectedOption) => {
                                    setValue('id_type', selectedOption?.value);
                                }}
                                placeholder={"ID Type"}
                            />
                            <input
                                type="text" 
                                {...register("govt_id")}
                                placeholder='Enter Govt ID'
                                className='govt_id'
                            />
                        </div>
                    </div>
                    <div className='validation-error'>{errors.govt_id && errors.govt_id.message}</div>
                </div>
            </section>
            <section className={style.contact_wrapper}>
            <h2 className={style.form_heading}>Contact Details</h2>
                <div className={style.contact_col1}>
                    <div className={style.govtWrapper}>
                    <label className='pr'>Guardian Details</label>
                    <div className={style.govtInputWrapper}>
                        <Dropdown
                            name="guardian_label"
                            options={guardian_label_options}
                            defaultValue={""}
                            {...register("guardian_label")}
                            onChange={(selectedOption) => {
                                setValue('guardian_label', selectedOption?.value);
                            }}
                            placeholder={"Enter Label"}
                        />
                        <input 
                        type="text"
                        {...register('guardian_name')}
                        placeholder='Enter Guardian Name'
                        />
                    </div>
                    </div>
                    <div className='validation-error'>{errors.guardian_name && errors.guardian_name.message}</div>
                </div>
                <div className={style.contact_col2}>
                    <div className={''}>
                    <label className='pr'>Email</label>
                    <input
                        type="email" 
                        {...register("email")}
                        placeholder='Enter Email'
                    />
                    </div>
                    <div className='validation-error'>{errors.email && errors.email.message}</div>
                </div>
                <div className={style.contact_col3}>
                    <div className={'emergency_contact_number'}>
                        <label className='pr'>Emergency Contact Number</label>
                        <input 
                            type="text"
                            name='emergency_contact_number'
                            placeholder='Enter Emergency No'
                            {...register('emergency_contact_number')}
                        />
                    </div>
                        <div className='validation-error'>
                            {errors.emergency_contact_number && errors.emergency_contact_number.message}
                        </div>
                    </div>
            </section>
            <section className={style.address_wrapper}>
                <h2 className={style.form_heading}>Address Details</h2>
                <div className={style.address_col1}>
                    <div className={''}>
                        <label className='pr'>Address</label>
                        <input 
                            type="text"
                            name="address"
                            {...register('address')}
                            placeholder='Enter Address'
                        />
                    </div>
                    <div className='validation-error'>{errors.address && errors.address.message}</div>
                </div>
                <div className={style.address_col2}>
                    <div className={style.addressInput}>
                        <label className='pr'>State</label>
                        <Dropdown
                            name="state"
                            options={stateArray}
                            defaultValue={""}
                            {...register('state')}
                            onChange={(selectedOption) => {
                                setValue('state', selectedOption?.value);
                            }}
                            placeholder={"Enter State"}
                        />
                    </div>
                    <div className='validation-error'>{errors.state && errors.state.message}</div>
                </div>
                <div className={style.address_col3}>
                    <div className={style.addressInput}>
                        <label className='pr'>City</label>
                        <Dropdown
                            name="city"
                            options={cities}
                            defaultValue={""}
                            {...register('city')}
                            onChange={(selectedOption) => {
                                setValue('city', selectedOption?.value);
                            }}
                            placeholder={"Enter City/Town/Village"}
                        />
                    </div>
                    <div className='validation-error'>{errors.city && errors.city.message}</div>
                </div>
                <div className={style.address_col4}>
                    <div className={''}>
                        <label className='pr'>Country</label>
                        <input
                            type="text"
                            name="country"
                            {...register('country')}
                            placeholder='India'
                            readOnly={true}
                        />
                    </div>
                    <div className='validation-error'>{errors.country && errors.country.message}</div>
                </div>
                <div className={style.address_col5}>
                    <div className={''}>
                        <label className='pr'>Pincode</label>
                        <input 
                            type="text"
                            name='pincode'
                            {...register('pincode')}
                            placeholder='Enter pincode'
                        />
                    </div>
                    <div className='validation-error'>{errors.pincode && errors.pincode.message}</div>
                </div>
            </section>
            <section className={style.other_wrapper}>
                <h2 className={style.form_heading}>Other Details</h2>
                <div className={style.other_col1}>
                    <div className={''}>
                        <label className='pr'>Occupation</label>
                        <input
                            type="text" 
                            name="occupation"
                            {...register('occupation')}
                            placeholder='Enter Occupation'
                        />
                    </div>
                    <div className='validation-error'>{errors.occupation && errors.occupation.message}</div>
                </div>
                <div className={style.other_col2}>
                    <div className={'col_other_container'}>
                        <label className='pr'>Religion</label>
                        <Dropdown
                            name="religion"
                            options={religion_options}
                            defaultValue={""}
                            {...register("religion")}
                            onChange={(selectedOption) => {
                                setValue('religion', selectedOption?.value);
                            }}
                            placeholder={"Religion"}
                        />
                    </div>
                    <div className='validation-error'>{errors.religion && errors.religion.message}</div>
                </div>
                <div className={style.other_col3}>
                    <div className={'col_other_container'}>
                        <label className='pr'>Marital Status</label> 
                        <Dropdown
                            name="marital_status"
                            options={marital_status_options}
                            defaultValue={""}
                            {...register("marital_status")}
                            onChange={(selectedOption) => {
                                setValue('marital_status', selectedOption?.value);
                            }}
                            className='react_select'
                            placeholder={"Marital Status"}
                        />
                    </div>
                    <div className='validation-error'>{errors.marital_status && errors.marital_status.message}</div>
                </div>
                <div className={style.other_col4}>
                    <div className={'col_other_container'}>
                        <label className='pr'>Blood Group</label>
                        <Dropdown
                            name="blood_group"
                            options={blood_group_options}
                            defaultValue={""}
                            {...register("blood_group")}
                            onChange={(selectedOption) => {
                                setValue('blood_group', selectedOption?.value);
                            }}
                            placeholder={"Blood Group"}
                        />
                        </div>
                    <div className='validation-error'>{errors.blood_group && errors.blood_group.message}</div>
                </div>
                <div className={style.other_col5}>
                    <div className={''}>
                        <label className='pr'>Nationality</label>
                        <input 
                            type="text"
                            placeholder='India'
                            name="nationality"
                            {...register('nationality')}
                            readOnly={true}
                        />
                    </div>
                    <div className='validation-error'>{errors.nationality && errors.nationality.message}</div>
                </div>
            </section>
            <div className='buttons'>
                <button className='cancel-btn'>
                    <div>CANCEL</div>
                    (<span>ESC</span>)
                </button>
                <button type="submit" className='submit-btn'>
                    {loading ? <div>SUBMIT...</div>: <div>SUBMIT</div>}
                    (<span>S</span>)
                </button>
            </div>
        </form>
    </>
    );
}