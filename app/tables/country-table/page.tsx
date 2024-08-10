import ModelTable from '@/components/tables/ModelTable'
import { CreateCountryDto } from '@/models/Dto/WithSeoAddition/Countries/create-country-dto'
import { GetCountryDto } from '@/models/Dto/WithSeoAddition/Countries/get-country-dto'
import { UpdateCountryDto } from '@/models/Dto/WithSeoAddition/Countries/update-country-dto'
import { CountryService } from '@/service/crudServices/CountryService'
import React from 'react'

const page = () => {


    return <ModelTable<
            GetCountryDto,
            CreateCountryDto,
            UpdateCountryDto,
            CountryService
        >
            props={{
                Service: new CountryService()
            }
            }

        />


}

export default page;