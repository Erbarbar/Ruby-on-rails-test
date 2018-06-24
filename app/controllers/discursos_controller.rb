class DiscursosController < ApplicationController
  before_action :set_discurso, only: [:show, :edit, :update, :destroy]

  # GET /discursos
  # GET /discursos.json
  def index
    @discursos = Discurso.all
  end

  # GET /discursos/1
  # GET /discursos/1.json
  def show
  end

  # GET /discursos/new
  def new
    @discurso = Discurso.new
  end

  # GET /discursos/1/edit
  def edit
  end

  # POST /discursos
  # POST /discursos.json
  def create
    @discurso = Discurso.new(discurso_params)

    respond_to do |format|
      if @discurso.save
        format.html { redirect_to @discurso, notice: 'Discurso was successfully created.' }
        format.json { render :show, status: :created, location: @discurso }
      else
        format.html { render :new }
        format.json { render json: @discurso.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /discursos/1
  # PATCH/PUT /discursos/1.json
  def update
    respond_to do |format|
      if @discurso.update(discurso_params)
        format.html { redirect_to @discurso, notice: 'Discurso was successfully updated.' }
        format.json { render :show, status: :ok, location: @discurso }
      else
        format.html { render :edit }
        format.json { render json: @discurso.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /discursos/1
  # DELETE /discursos/1.json
  def destroy
    @discurso.destroy
    respond_to do |format|
      format.html { redirect_to discursos_url, notice: 'Discurso was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_discurso
      @discurso = Discurso.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def discurso_params
      params.require(:discurso).permit(:data, :sescricao, :duracao)
    end
end
