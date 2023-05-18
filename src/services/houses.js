import useApi from 'src/composables/UseApi'

export default function housesService(){
  const {list, show, create, update, remove} = useApi('house_rules')

  return {
    list,
    show,
    create,
    update,
    remove
  }
}
