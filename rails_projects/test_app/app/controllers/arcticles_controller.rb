class ArcticlesController < ApplicationController
  before_action :set_arcticle, only: [:show, :edit, :update, :destroy]

  # GET /arcticles
  # GET /arcticles.json
  def index
    @arcticles = Arcticle.all
  end

  # GET /arcticles/1
  # GET /arcticles/1.json
  def show
  end

  # GET /arcticles/new
  def new
    @arcticle = Arcticle.new
  end

  # GET /arcticles/1/edit
  def edit
  end

  # POST /arcticles
  # POST /arcticles.json
  def create
    @arcticle = Arcticle.new(arcticle_params)

    respond_to do |format|
      if @arcticle.save
        format.html { redirect_to @arcticle, notice: 'Arcticle was successfully created.' }
        format.json { render :show, status: :created, location: @arcticle }
      else
        format.html { render :new }
        format.json { render json: @arcticle.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /arcticles/1
  # PATCH/PUT /arcticles/1.json
  def update
    respond_to do |format|
      if @arcticle.update(arcticle_params)
        format.html { redirect_to @arcticle, notice: 'Arcticle was successfully updated.' }
        format.json { render :show, status: :ok, location: @arcticle }
      else
        format.html { render :edit }
        format.json { render json: @arcticle.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /arcticles/1
  # DELETE /arcticles/1.json
  def destroy
    @arcticle.destroy
    respond_to do |format|
      format.html { redirect_to arcticles_url, notice: 'Arcticle was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_arcticle
      @arcticle = Arcticle.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def arcticle_params
      params.require(:arcticle).permit(:title, :description)
    end
end
