'use client'

import Image from 'next/image';
import React, {useState} from 'react';
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from "@/components/MeetingModal";
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from './ui/textarea';
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import { Input } from './ui/input';

registerLocale("es", es);

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    const { user } = useUser(); 
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date,
        description: '',
        link: ''
    })
const [callDetails, setCallDetails] = useState<Call>();
const { toast } = useToast()

    const createMeeting = async () => {
      if(!client || !user) return;

      try {
        if(!values.dateTime) {
          toast({
            title: "Por favor, elige fecha y hora."
          })
          return;
        }

        const id = crypto.randomUUID();
        const call = client.call('default', id);
        
        
        if(!call) throw new Error('No se pudo crear la llamada');

        const startsAt = values.dateTime.toISOString() ||
        new Date(Date.now()).toISOString();
        const description = values.description || 'Reunión instantánea';

        await call.getOrCreate({
          data: {
            starts_at: startsAt,
            custom: {
              description
            }
          }
        })

        setCallDetails(call);

        if(!values.description) {
          router.push(`/reunion/${call.id}`)
        }

        toast({
          title: "Reunión creada con éxito."
        })

      } catch (error) {
        console.error(error);
        toast({
          title: "Error al crear reunión",
        })
      }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reunion/${callDetails?.id}`

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>
        <HomeCard 
        img='/icons/add-meeting.svg'
        title='Nueva reunión'
        description='Inicia una reunión'
        handleClick={() => setMeetingState('isInstantMeeting')}
        className='bg-orange-1'
        />
       <HomeCard 
        img='/icons/schedule.svg'
        title='Programar reunión'
        description='Agenda una reunión'
        handleClick={() => setMeetingState('isScheduleMeeting')}
        className='bg-blue-2'
        />
        <HomeCard 
        img='/icons/recordings.svg'
        title='Ver grabaciones'
        description='Recuerda las reuniones anteriores'
        handleClick={() => router.push('/grabaciones')}
        className='bg-purple-1'
        />
       <HomeCard 
        img='/icons/join-meeting.svg'
        title='Unirse a una reunión'
        description='Únete a través de una invitación'
        handleClick={() => setMeetingState('isJoiningMeeting')}
        className='bg-yellow-1'
        />
        {!callDetails ? (
             <MeetingModal 
             isOpen={meetingState === 'isScheduleMeeting'}
             onClose={() => setMeetingState(undefined)}
             title= 'Iniciar reunión instantánea'
             buttonText='Programar reunión'
             handleClick={createMeeting}
           >
            <div className='flex flex-col gap-2.5'>
              <label className='text-base text-normal leading-[22px]'>Descripción de la reunión</label>
              <Textarea 
              className='border-none backdrop-filter backdrop-blur-lg bg-opacity-5 bg-white focus-visible:ring-0 focus-visible:ring-offset-0'
              onChange={(e) => {
                setValues({...values, description: e.target.value})
              }}
              />
            </div>
            <div className='flex w-full flex-col gap-2.5'>
              <label className='text-base text-normal leading-[22px]'>Elige fecha y hora</label>
              <DatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({...values, dateTime:date! })}
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={30}
                timeCaption='Hora'
                dateFormat="d MMM yyyy, h:mm aa"
                className='w-full rounded backdrop-filter backdrop-blur-lg bg-opacity-5 bg-white p-2 focus:outline-none'
                locale="es"
              />
            </div>
           </MeetingModal>
        ): (
          <MeetingModal 
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title= 'Reunión creada'
          className='text-center'
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast ({ title: '¡Enlace copiado!' })
          }}
          image='/icons/checked.svg'
          buttonIcon='/icons/copy.svg'
          buttonText='Copiar enlace de la reunión'


        />
        )}    
        <MeetingModal 
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title= 'Iniciar reunión instantánea'
        className='text-center'
        buttonText='Iniciar reunión'
        handleClick={createMeeting}
      />
        <MeetingModal 
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title= 'Introduce el enlace de la reunión'
        className='text-center focus-visible:ring-0 focus-visible:ring-offset-0'
        buttonText='Unirme a la reunión'
        handleClick={() => router.push(values.link)}
      >
        <Input 
        placeholder='Enlace de la reunión'
        className='border-none w-full rounded backdrop-filter backdrop-blur-lg bg-opacity-5 bg-white p-2 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
        onChange={(e) => setValues({...values, link: e.target.value})}
        />
      </MeetingModal>
        </section>
  )
}

export default MeetingTypeList