export const snackbarMixin = {
  data: function() {
    return {
      showSnackbar: false,
      color: '',
      message: ''
    }
  },
  methods: {
    showSuccessMessage(message: string) {
      const that: any = this
      that.showSnackbar = true
      that.color = 'success'
      that.message = message
    },
    showFailMessage(message: string) {
      const that: any = this
      that.showSnackbar = true
      that.color = 'red'
      that.message = message
    },
    showMessage(message: string) {
      const that: any = this
      that.showSnackbar = true
      that.color = ''
      that.message = message
    }
  }
}
